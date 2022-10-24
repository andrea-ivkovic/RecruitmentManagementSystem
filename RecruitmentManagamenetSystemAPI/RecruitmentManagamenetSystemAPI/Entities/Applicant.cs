using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentManagamenetSystemAPI.Entities
{
    public class Applicant
    {
        [ForeignKey(nameof(IdentityUser))]
        public string UserId { get; set; }

        public IdentityUser IdentityUser { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string? Picture { get; set; }

        [StringLength(30)]
        public string? PhoneNumber { get; set; }

        [StringLength(100)]
        public string? Address { get; set; }


        public string? About { get; set; }


        public string? Education { get; set; }


        public string? WorkExperience { get; set; }





    }
}
