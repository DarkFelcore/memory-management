using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("Read")]
        public async Task<ActionResult<IEnumerable<CompanyReadDto>>> ReadCompanies()
        {
            var convertedCompanies = _mapper.Map<IEnumerable<CompanyReadDto>>(await _context.Companies.ToListAsync());
            if(convertedCompanies == null)
            {
                return NotFound("Could not retreive any company");
            }
            return Ok(convertedCompanies);
        }



        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
        {
            if (dto == null) return BadRequest("Please provide the necessary data to create a company");
            var newCompany = _mapper.Map<Company>(dto);
            if (newCompany == null) return BadRequest("Please provide the necessary data to create a company");
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();
            return Ok(newCompany);
        }
    }
}
