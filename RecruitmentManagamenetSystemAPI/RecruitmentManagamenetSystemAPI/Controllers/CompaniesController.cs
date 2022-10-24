using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentManagamenetSystemAPI.DTOs;
using RecruitmentManagamenetSystemAPI.Entities;
using RecruitmentManagamenetSystemAPI.Helpers;

namespace RecruitmentManagamenetSystemAPI.Controllers
{
    [ApiController]
    [Route("api/companies")]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "companies";

        public CompaniesController(ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
        }



        [HttpGet("{id:int}")]
        public async Task<ActionResult<CompanyDTO>> Get(int id)
        {
            var company = await context.Companies.FirstOrDefaultAsync(x => x.Id == id);
            if (company == null)
            {
                return NotFound();
            }

            return mapper.Map<CompanyDTO>(company);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromBody] CompanyCreationDTO companyCreationDTO)
        {
            var company = mapper.Map<Company>(companyCreationDTO);
            context.Add(company);
            await context.SaveChangesAsync();
            return company.Id;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] CompanyCreationDTO companyCreationDTO)
        {
            var company = await context.Companies.FirstOrDefaultAsync(x => x.Id == id);

            if (company == null)
            {
                return NotFound();
            }

            company = mapper.Map(companyCreationDTO, company);

            if (companyCreationDTO.Logo != null)
            {
                company.Logo = await fileStorageService.EditFile(containerName, companyCreationDTO.Logo, company.Logo);

            }

            await context.SaveChangesAsync();

            return NoContent();
        }


    }
}
