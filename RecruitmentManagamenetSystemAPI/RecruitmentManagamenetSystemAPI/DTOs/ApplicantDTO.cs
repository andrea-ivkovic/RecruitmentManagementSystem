namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class ApplicantDTO
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; } 

        public DateTime? DateOfBirth { get; set; }

        public string? Picture { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }


        public string? About { get; set; }


        public string? Education { get; set; }


        public string? WorkExperience { get; set; }
    }
}
