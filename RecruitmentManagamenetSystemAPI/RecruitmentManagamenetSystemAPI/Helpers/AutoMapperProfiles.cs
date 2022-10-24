using AutoMapper;
using RecruitmentManagamenetSystemAPI.DTOs;
using RecruitmentManagamenetSystemAPI.Entities;

namespace RecruitmentManagamenetSystemAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<CompanyCreationDTO, Company>()
                .ForMember(x => x.Logo, options => options.Ignore());

            CreateMap<Company, CompanyDTO>();

            CreateMap<CompanyUserCreationDTO, UserCredentials>();

            CreateMap<CompanyUserCreationDTO, CompanyUser>();

            CreateMap<ApplicantCreationDTO, Applicant>()
                .ForMember(x => x.Picture, options => options.Ignore());

            CreateMap<CompanyUser, CompanyUserDTO>()
                .ForMember(x => x.Email, options => options.MapFrom(prop => prop.IdentityUser.Email));

            CreateMap<Applicant, ApplicantDTO>()
                .ForMember(x => x.Email, options => options.MapFrom(prop => prop.IdentityUser.Email));

            CreateMap<JobSector, JobSectorDTO>();

            CreateMap<JobCreationDTO, Job>();
                
            CreateMap<Job, JobDTO>()
                .ForMember(x => x.Logo, options => options.MapFrom(prop => prop.Company.Logo))
                .ForMember(x => x.CompanyName, options => options.MapFrom(prop => prop.Company.CompanyName))
                .ForMember(x => x.JobSector, options => options.MapFrom(prop => prop.JobSector.Name));

            CreateMap<ApplicantJobCreationDTO, ApplicantsJobs>();

            CreateMap<ApplicantsJobs, ApplicantJobDTO>()
                .ForMember(x => x.FirstName, options => options.MapFrom(prop => prop.Applicant.FirstName))
                .ForMember(x => x.LastName, options => options.MapFrom(prop => prop.Applicant.LastName));

            CreateMap<Job, ApplicantsByJobDTO>()
                .ForMember(x => x.Name, options => options.MapFrom(prop => prop.Title))
                .ForMember(x => x.Value, options => options.MapFrom(prop => prop.ApplicantsJobs.Count()));
        }


    }
}
