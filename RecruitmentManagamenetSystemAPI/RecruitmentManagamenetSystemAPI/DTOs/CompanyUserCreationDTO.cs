using System.ComponentModel.DataAnnotations;

namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class CompanyUserCreationDTO
    {
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int CompanyId { get; set; }


    }
}
