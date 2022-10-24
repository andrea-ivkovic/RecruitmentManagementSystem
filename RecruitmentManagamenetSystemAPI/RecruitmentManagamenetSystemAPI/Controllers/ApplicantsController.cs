using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RecruitmentManagamenetSystemAPI.DTOs;
using RecruitmentManagamenetSystemAPI.Entities;
using RecruitmentManagamenetSystemAPI.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RecruitmentManagamenetSystemAPI.Controllers
{
    [ApiController]
    [Route("api/applicants")]
    public class ApplicantsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "applicants";

        public ApplicantsController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration, ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicantDTO>> Get(string id)
        {
            var applicant = await context.Applicants.Where(x => x.UserId == id).Include(x => x.IdentityUser).FirstOrDefaultAsync();
            if (applicant == null)
            {
                return NotFound();
            }

            return mapper.Map<ApplicantDTO>(applicant);
        }

        [HttpGet("applicantsNumber")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyUser")]
        public async Task<ActionResult<List<ApplicantsByJobDTO>>> GetApplicantsNumber()
        {
            var companyId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

            var jobs = context.Jobs.Include(x => x.Company).Where(x => x.Archived == false && x.Company.Id == Int32.Parse(companyId))
                .Include(x => x.JobSector).Include(x => x.ApplicantsJobs).OrderByDescending(x => x.CreationDate);

            return mapper.Map<List<ApplicantsByJobDTO>>(jobs);
        }


        [HttpPost("createApplicant")]
        public async Task<ActionResult<AuthenticationResponse>> CreateAdmin([FromBody] ApplicantCreationDTO applicantCreationDTO)
        {

            //create record in AspNetUsers table
            var user = new IdentityUser { UserName = applicantCreationDTO.Email, Email = applicantCreationDTO.Email };
            var result = await userManager.CreateAsync(user, applicantCreationDTO.Password);

            //obtain userCredentials
            var userCredentials = new UserCredentials { Email = applicantCreationDTO.Email, Password = applicantCreationDTO.Password };

            //create record in Applicant table
            var applicant = mapper.Map<Applicant>(applicantCreationDTO);
            applicant.UserId = user.Id;
            context.Add(applicant);
            await context.SaveChangesAsync();

            //create applicant role claim in AspNetUsersClaims
            user = await userManager.FindByIdAsync(applicant.UserId);
            await userManager.AddClaimAsync(user, new Claim("role", "applicant"));


            var fullName = applicant.FirstName + " " + applicant.LastName;

            if (result.Succeeded)
            {
                return await BuildToken(userCredentials, fullName, applicant.UserId);
            }
            else
            {
                return BadRequest("Incorrect Login");
            }

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromForm] ApplicantCreationDTO applicantCreationDTO)
        {
            var applicant = await context.Applicants.FirstOrDefaultAsync(x => x.UserId == id);

            if (applicant == null)
            {
                return NotFound();
            }

            applicant = mapper.Map(applicantCreationDTO, applicant);

            if (applicantCreationDTO.Picture != null)
            {
                applicant.Picture = await fileStorageService.EditFile(containerName, applicantCreationDTO.Picture, applicant.Picture);

            }

            await context.SaveChangesAsync();

            return NoContent();
        }


        private async Task<AuthenticationResponse> BuildToken(UserCredentials userCredentials, string fullName, string userId, string companyName = "", int companyId = 0)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim("fullName", fullName));
            claims.Add(new Claim("email", userCredentials.Email));
            claims.Add(new Claim("userId", userId));
            if (!string.IsNullOrEmpty(companyName))
            {
                claims.Add(new Claim("companyName", companyName));
                claims.Add(new Claim("companyId", companyId.ToString()));
            }


            //adding claims from database (AspNetUserClaims table) for currently logged in user
            var user = await userManager.FindByNameAsync(userCredentials.Email);
            var claimsDB = await userManager.GetClaimsAsync(user);
            claims.AddRange(claimsDB);


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token), //here we get a string representation of the token
                Expiration = expiration
            };
        }


    }
}

