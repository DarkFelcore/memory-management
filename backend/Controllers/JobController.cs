using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
using backend.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;
        public JobController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("Read")]
        public async Task<ActionResult<IEnumerable<JobReadDto>>> GetJobsAsync()
        {
            var convertedJobs = _mapper.Map<IEnumerable<JobReadDto>>(await _context.Jobs.Include(job => job.Company).ToListAsync());
            if (convertedJobs == null)
            {
                return NotFound("No jobs could be retreived");
            }
            return Ok(convertedJobs);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateJob ([FromBody] JobCreateDto dto)
        {
            if (dto == null)
            {
                return NotFound("Please provide the necessary data to create a job");
            }

            var companies = await _context.Companies.ToListAsync();
            var convertedJob = _mapper.Map<Job>(dto);

            if (convertedJob == null)
            {
                return NotFound("Please provide the necessary data to create a job");
            }

            if (companies.Any(x => x.Id == convertedJob.CompanyId) == false)
            {
                return NotFound("Please provide a CompanyId that exists");
            }

            await _context.Jobs.AddAsync(convertedJob);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<JobReadDto>(convertedJob));
        }
    }
}
