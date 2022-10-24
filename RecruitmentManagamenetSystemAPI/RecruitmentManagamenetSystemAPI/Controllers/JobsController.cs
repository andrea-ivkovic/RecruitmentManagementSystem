using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentManagamenetSystemAPI.DTOs;
using RecruitmentManagamenetSystemAPI.Entities;
using RecruitmentManagamenetSystemAPI.Helpers;

namespace RecruitmentManagamenetSystemAPI.Controllers
{
    [ApiController]
    [Route("api/jobs")]
    public class JobsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public JobsController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration, ApplicationDbContext context, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("jobSectors")]
        public async Task<ActionResult<List<JobSectorDTO>>> GetJobSectors()
        {
            var sectors = await context.JobSectors.OrderBy(x => x.Name).ToListAsync();
            return mapper.Map<List<JobSectorDTO>>(sectors);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<JobDTO>> GetJob(int id)
        {
            var job = await context.Jobs.Where(x => x.Id == id).Include(x => x.Company).Include(x => x.JobSector).FirstOrDefaultAsync();
            
            return mapper.Map<JobDTO>(job);
        }


        [HttpGet("getApplicants/{jobId:int}")]
        public async Task<ActionResult<List<ApplicantJobDTO>>> GetApplicants(int jobId)
        {
            var applicants = await context.ApplicantsJobs.Include(x => x.Applicant).Where(x => x.JobId == jobId).
                OrderByDescending(x => x.DateOfApplication).ToListAsync();
            var test = mapper.Map<List<ApplicantJobDTO>>(applicants);
            return test;
        }

        [HttpGet("getLatest")]
        public async Task<ActionResult<List<JobDTO>>> GetLatest()
        {
            var jobs = await context.Jobs.Include(x => x.Company).Where(x => x.EndDate > DateTime.Now).Include(x => x.JobSector).OrderByDescending(x => x.CreationDate).Take(10).ToListAsync();
            
            return mapper.Map<List<JobDTO>>(jobs);
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<JobDTO>>> Filter([FromQuery] SearchJobsDTO searchJobsDTO)
        {
            var jobsQueryable = context.Jobs.Include(x => x.Company).Where(x => x.EndDate > DateTime.Now)
                .Include(x => x.JobSector).OrderByDescending(x => x.CreationDate).AsQueryable();

            if (!string.IsNullOrEmpty(searchJobsDTO.Title))
            {
                jobsQueryable = jobsQueryable.Where(x => x.Title.Contains(searchJobsDTO.Title));
            }

            if(!string.IsNullOrEmpty(searchJobsDTO.JobSectorId))
            {
                var jobSectorId = Int32.Parse(searchJobsDTO.JobSectorId);
                jobsQueryable = jobsQueryable.Where(x => x.JobSectorId == jobSectorId);
            }
            
            await HttpContext.InsertParametersPaginationInHeader(jobsQueryable);
            var jobs = await jobsQueryable.OrderByDescending(x => x.CreationDate).Paginate(searchJobsDTO.PaginationDTO).ToListAsync();

            return mapper.Map<List<JobDTO>>(jobs);
        }


        [HttpGet("searchCompanyJobs")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyUser")]
        public async Task<ActionResult<List<JobDTO>>> Search([FromQuery] SearchCompanyJobsDTO searchCompanyJobsDTO)
        {
            var companyId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

            var jobsQueryable = context.Jobs.Include(x => x.Company).Where(x => x.Archived==false && x.Company.Id == Int32.Parse(companyId))
                .Include(x => x.JobSector).OrderByDescending(x => x.CreationDate).AsQueryable();

            if (!string.IsNullOrEmpty(searchCompanyJobsDTO.Title))
            {
                jobsQueryable = jobsQueryable.Where(x => x.Title.Contains(searchCompanyJobsDTO.Title));
            }

            await HttpContext.InsertParametersPaginationInHeader(jobsQueryable);
            var jobs = await jobsQueryable.OrderByDescending(x => x.CreationDate).ToListAsync();

            return mapper.Map<List<JobDTO>>(jobs);
        }

        [HttpGet("getLatestCompanyJobs")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyUser")]
        public async Task<ActionResult<List<JobDTO>>> GetLatestCompanyJobs()
        {
            var companyId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

            var jobs = context.Jobs.Include(x => x.Company).Where(x => x.Archived == false && x.Company.Id == Int32.Parse(companyId))
                .Include(x => x.JobSector).OrderByDescending(x => x.CreationDate);

            return mapper.Map<List<JobDTO>>(jobs);
        }


        [HttpGet("searchArchive")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyUser")]
        public async Task<ActionResult<List<JobDTO>>> SearchArchive([FromQuery] SearchCompanyJobsDTO searchCompanyJobsDTO)
        {
            var companyId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

            var jobsQueryable = context.Jobs.Include(x => x.Company).Where(x => x.Archived == true && x.Company.Id == Int32.Parse(companyId))
                .Include(x => x.JobSector).OrderByDescending(x => x.CreationDate).AsQueryable();

            if (!string.IsNullOrEmpty(searchCompanyJobsDTO.Title))
            {
                jobsQueryable = jobsQueryable.Where(x => x.Title.Contains(searchCompanyJobsDTO.Title));
            }

            await HttpContext.InsertParametersPaginationInHeader(jobsQueryable);
            var jobs = await jobsQueryable.OrderByDescending(x => x.CreationDate).ToListAsync();

            return mapper.Map<List<JobDTO>>(jobs);
        }

        [HttpGet("getArchive")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyUser")]
        public async Task<ActionResult<List<JobDTO>>> GetArchive()
        {
            var companyId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

            var jobs = context.Jobs.Include(x => x.Company).Where(x => x.Archived == true && x.Company.Id == Int32.Parse(companyId))
                .Include(x => x.JobSector).OrderByDescending(x => x.CreationDate);

            return mapper.Map<List<JobDTO>>(jobs);
        }




        [HttpGet("history")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsApplicant")]
        public async Task<ActionResult<List<JobDTO>>> History([FromQuery] SearchJobsDTO searchJobsDTO)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId").Value;
            var jobsQueryable = context.Jobs.Include(x => x.Company)
                .Include(x => x.JobSector).Include(x => x.ApplicantsJobs).Where(x => x.ApplicantsJobs.Any(x => x.UserId == userId)).OrderByDescending(x => x.CreationDate).AsQueryable();


            await HttpContext.InsertParametersPaginationInHeader(jobsQueryable);
            var jobs = await jobsQueryable.OrderByDescending(x => x.CreationDate).Paginate(searchJobsDTO.PaginationDTO).ToListAsync();

            return mapper.Map<List<JobDTO>>(jobs);
        }




        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyAdmin")]
        public async Task<ActionResult> Post([FromForm] JobCreationDTO jobCreationDTO)
        {
            var companyId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var test = jobCreationDTO;
            var job = mapper.Map<Job>(jobCreationDTO);
            job.CompanyId = Int32.Parse(companyId);
            context.Add(job);
            await context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPost("apply")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsApplicant")]
        public async Task<ActionResult> Apply([FromForm] ApplicantJobCreationDTO applicantJobCreationDTO)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "userId").Value;
            applicantJobCreationDTO.UserId = userId;

            var applicantJob = mapper.Map<ApplicantsJobs>(applicantJobCreationDTO);
            context.Add(applicantJob);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("addAssessmentScore")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyUser")]
        public async Task<ActionResult> AddAssessmentScore([FromForm] ApplicantJobCreationDTO applicantJobCreationDTO)
        {
            var application = await context.ApplicantsJobs
                .Where(x => x.UserId == applicantJobCreationDTO.UserId && x.JobId == applicantJobCreationDTO.JobId).FirstOrDefaultAsync();

            if (application == null)
            {
                return NotFound();
            }

            application = mapper.Map(applicantJobCreationDTO, application);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("archive/{jobId:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyAdmin")]
        public async Task<ActionResult> Archive(int jobId, [FromForm] JobCreationDTO jobCreationDTO)
        {
            var job = await context.Jobs.FirstOrDefaultAsync(x => x.Id== jobId);

            if (job == null)
            {
                return NotFound();
            }

            job = mapper.Map(jobCreationDTO, job);

            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
