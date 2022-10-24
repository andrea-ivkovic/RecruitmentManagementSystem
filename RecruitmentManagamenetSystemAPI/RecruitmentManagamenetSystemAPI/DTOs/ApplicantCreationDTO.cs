using System.ComponentModel.DataAnnotations;

namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class ApplicantCreationDTO
    {
        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public IFormFile? Picture { get; set; }

        [StringLength(30)]
        public string? PhoneNumber { get; set; }

        [StringLength(100)]
        public string? Address { get; set; }


        public string? About { get; set; }

        public string? Education { get; set; }

        public string? WorkExperience { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
