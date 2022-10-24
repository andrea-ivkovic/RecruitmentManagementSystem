using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentManagamenetSystemAPI.Entities
{
    public class ApplicantsJobs
    {
        [ForeignKey(nameof(Applicant))]
        public string UserId { get; set; }

        public Applicant Applicant { get; set; }

        [ForeignKey(nameof(Job))]
        public int JobId { get; set; }
        public Job Job { get; set; }

        public DateTime DateOfApplication { get; set; }

        public double? AssessmentScore { get; set; }

    }
}
