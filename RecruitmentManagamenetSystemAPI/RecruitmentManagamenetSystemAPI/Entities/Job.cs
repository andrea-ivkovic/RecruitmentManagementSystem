using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentManagamenetSystemAPI.Entities
{
    public class Job
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Company))]
        public int CompanyId { get; set; }
        public Company Company { get; set; }

        [StringLength(50)]
        public string Title { get; set; }

        public string Description { get; set; }


        public string SkillsAndRequirements { get; set; }

        [ForeignKey(nameof(JobSector))]
        public int  JobSectorId { get; set; }

        public JobSector JobSector { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool Archived { get; set; }

        public List<ApplicantsJobs> ApplicantsJobs { get; set; }


    }
}
