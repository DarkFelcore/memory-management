using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Candidate;
using backend.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;
        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("Read")]
        public async Task<ActionResult<IEnumerable<CandidateReadDto>>> GetCandidates()
        {
            var candidates = await _context.Candidates.Include(x => x.Job).OrderByDescending(x => x.CreatedAt).ToListAsync();
            if(candidates == null)
            {
                return NotFound("No candidates found");
            }

            var convertedCandidates = _mapper.Map <IEnumerable<CandidateReadDto>>(candidates);
            if(convertedCandidates == null)
            {
                return NotFound("No candidates found");
            }

            return Ok(convertedCandidates);
        }

        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "pdf", url);
            if(!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCadidate([FromForm] CandidateCreateDto dto, IFormFile pdfFile)
        {
            var fiveMegaByte = 5 * 1024 * 1024;
            var fileMimeType = "application/pdf";

            if (pdfFile.Length > fiveMegaByte || pdfFile.ContentType != fileMimeType)
            {
                return BadRequest("File is not valid");
            }

            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "pdf", resumeUrl);
             
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            var newCandidate = _mapper.Map<Candidate>(dto);
            newCandidate.ResumeUrl = resumeUrl;

            var jobs = await _context.Jobs.ToListAsync();
            if(jobs.Any(x => x.Id == dto.JobId) == false)
            {
                return NotFound("Please provide an existing job id");
            }

            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate created successfully");
        }
    }
}
