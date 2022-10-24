using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RecruitmentManagamenetSystemAPI.Entities;

namespace RecruitmentManagamenetSystemAPI
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<CompanyUser>()
                .HasKey(x => new { x.UserId });

            builder.Entity<Applicant>()
                .HasKey(x => new { x.UserId });

            builder.Entity<Company>()
                 .HasMany(c => c.Jobs)
                 .WithOne(e => e.Company);

            builder.Entity<JobSector>()
                .HasMany(s => s.Jobs)
                .WithOne(j => j.JobSector);

            builder.Entity<ApplicantsJobs>()
                .HasKey(x => new {x.UserId, x.JobId});

            base.OnModelCreating(builder);
        }

        public DbSet<Company> Companies { get; set; }

        public DbSet<CompanyUser> CompanyUsers { get; set; }

        public DbSet<Applicant> Applicants { get; set; }
        
        public DbSet<JobSector> JobSectors { get; set; }

        public DbSet<Job> Jobs { get; set; }

        public DbSet<ApplicantsJobs> ApplicantsJobs { get; set; }

    }
}
