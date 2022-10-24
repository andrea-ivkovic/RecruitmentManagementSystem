using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RecruitmentManagamenetSystemAPI.DTOs;
using RecruitmentManagamenetSystemAPI.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using RecruitmentManagamenetSystemAPI.Helpers;

namespace RecruitmentManagamenetSystemAPI.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public AccountsController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration, ApplicationDbContext context, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("test")]
        public async Task<ActionResult<string>> Get()
        {
            return "This is a message from API";
        }


        [HttpGet("allUsers")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyAdmin")]
        public async Task<ActionResult<List<CompanyUserDTO>>> GetUsers()
        {
            //get company id from currently logged in user
            var companyName = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "companyName").Value;
            var company = await context.Companies.FirstOrDefaultAsync(x => x.CompanyName == companyName);
            var companyId = company.Id;

            var adminEmail = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;

            var admin = await userManager.FindByEmailAsync(adminEmail);
            var adminId = admin.Id;
           
            //get all company users who have that comapny id
            var users = await context.CompanyUsers.Where(x => x.CompanyId == companyId && x.UserId!= adminId).OrderBy(x => x.FirstName).ThenBy(x => x.LastName).Include(x => x.IdentityUser).ToListAsync();
            List<CompanyUserDTO> result = new List<CompanyUserDTO>();
            foreach(var user in users)
            {
                //var email = await GetUserEmail(user.UserId);
                var role =await  GetUserRole(user.UserId);
                var companyUser = mapper.Map<CompanyUserDTO>(user);
                //companyUser.Email = email;
                companyUser.Role = role;
                result.Add(companyUser);
            }

            return result;
        }

        [HttpPost("createAdmin")]
        public async Task<ActionResult<AuthenticationResponse>> CreateAdmin([FromBody] CompanyUserCreationDTO companyUserCreationDTO)
        {

            //create record in AspNetUsers table
            var user = new IdentityUser { UserName = companyUserCreationDTO.Email, Email = companyUserCreationDTO.Email };
            var result = await userManager.CreateAsync(user, companyUserCreationDTO.Password);

            //obtain userCredentials
            var userCredentials = new UserCredentials { Email = companyUserCreationDTO.Email, Password = companyUserCreationDTO.Password };

            //create record in CompanyUsers table
            var companyUser = mapper.Map<CompanyUser>(companyUserCreationDTO);
            context.Companies.Where(x => x.Id == companyUser.CompanyId).Load(); //explicit loading
            companyUser.UserId = user.Id;
            context.Add(companyUser);
            await context.SaveChangesAsync();

            //create admin claim in AspNetUsersClaims
            user = await userManager.FindByIdAsync(companyUser.UserId);
            await userManager.AddClaimAsync(user, new Claim("role", "companyAdmin"));

            var companyName = companyUser.Company.CompanyName;
            var fullName = companyUser.FirstName + " " + companyUser.LastName;

            if (result.Succeeded)
            {
                return await BuildToken(userCredentials, companyUser.FirstName + " " + companyUser.LastName, companyUser.UserId, companyUser.Company.CompanyName, 
                    companyUser.CompanyId);
            }
            else
            {
                return BadRequest("Incorrect Login");
            }

        }

        [HttpPost("addNewUser")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsCompanyAdmin")]
        public async Task<ActionResult> AddNewUser([FromBody] CompanyUserCreationDTO companyUserCreationDTO)
        {
            //create record in AspNetUsers table
            var user = new IdentityUser { UserName = companyUserCreationDTO.Email, Email = companyUserCreationDTO.Email };
            var result = await userManager.CreateAsync(user, companyUserCreationDTO.Password);


            //create record in CompanyUsers table
            var companyUser = mapper.Map<CompanyUser>(companyUserCreationDTO);
            companyUser.UserId = user.Id;
            var companyName = HttpContext.User.Claims.FirstOrDefault(x => x.Type=="companyName").Value;
            var company = await context.Companies.FirstOrDefaultAsync(x => x.CompanyName == companyName);
            companyUser.CompanyId = company.Id;
            context.Add(companyUser);
            await context.SaveChangesAsync();


            //create companyUser claim in AspNetUsersClaims
            user = await userManager.FindByIdAsync(companyUser.UserId);
            await userManager.AddClaimAsync(user, new Claim("role", "companyUser"));

            return NoContent();

        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserCredentials userCredentials)
        {
            var result = await signInManager.PasswordSignInAsync(userCredentials.Email, userCredentials.Password,
                isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return BadRequest("Incorrect email or password");
            }

            var user = await userManager.FindByEmailAsync(userCredentials.Email);
            var userId = user.Id;

            //look for user in companyusers table
            var companyUser = await context.CompanyUsers.Include(x => x.Company).FirstOrDefaultAsync(x => x.UserId == userId);

            //look for user in applicant table
            var applicant = await context.Applicants.FirstOrDefaultAsync(x => x.UserId == userId);



            if (result.Succeeded && companyUser != null)
            {
                return await BuildToken(userCredentials, companyUser.FirstName + " " + companyUser.LastName, companyUser.UserId, companyUser.Company.CompanyName,  companyUser.CompanyId);
            }
            else if (result.Succeeded && applicant != null)
            {
                return await BuildToken(userCredentials, applicant.FirstName + " " + applicant.LastName, applicant.UserId);
            }
            else
            {
                return BadRequest("Incorrect email or password");
            }

        }

        [HttpPut("assignAdminRole")]
        public async Task<ActionResult> AssignAdmin([FromBody] string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            await userManager.ReplaceClaimAsync(user, new Claim("role", "companyUser"), new Claim("role", "companyAdmin"));
            return NoContent();
        }

        [HttpPut("removeAdminRole")]
        public async Task<ActionResult> RemoveAdmin([FromBody] string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            await userManager.ReplaceClaimAsync(user, new Claim("role", "companyAdmin"), new Claim("role", "companyUser"));
            return NoContent();
        }

        [HttpDelete("{userId}")]
        public async Task<ActionResult> Delete(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            await userManager.DeleteAsync(user);
            return NoContent();
        }


        private async Task<AuthenticationResponse> BuildToken(UserCredentials userCredentials, string fullName, string userId = "", string companyName = "", int companyId = 0)
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

        private async Task<string> GetUserEmail(string UserId)
        {
            var user = await userManager.FindByIdAsync(UserId);
            return user.Email;
        }

        private async Task<string> GetUserRole(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            var claims = await userManager.GetClaimsAsync(user);
            return claims.Where(x => x.Type == "role").FirstOrDefault().Value;
        }

    }
}
