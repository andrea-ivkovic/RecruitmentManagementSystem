using System.ComponentModel.DataAnnotations;

namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class CompanyUserDTO
    {
        public string UserId { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }
    }
}