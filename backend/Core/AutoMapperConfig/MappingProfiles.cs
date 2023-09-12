using AutoMapper;
using backend.Core.Dtos.Candidate;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
using backend.Core.Entities;

namespace backend.Core.AutoMapperConfig
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Company
            CreateMap<Company, CompanyReadDto>();
            CreateMap<CompanyCreateDto, Company>();

            // Job
            CreateMap<Job, JobReadDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name))
                .ReverseMap();
            CreateMap<JobCreateDto, Job>();

            // Candidate
            CreateMap<Candidate, CandidateReadDto>()
                .ForMember(dest => dest.JobTitle, opt => opt.MapFrom(src => src.Job.Title));
            CreateMap<CandidateCreateDto, Candidate>();
        }
    }
}
