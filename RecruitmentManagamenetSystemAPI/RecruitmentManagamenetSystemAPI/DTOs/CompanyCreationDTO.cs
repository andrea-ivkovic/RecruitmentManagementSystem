using System.ComponentModel.DataAnnotations;

namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class CompanyCreationDTO
    {
        [StringLength(50)]
        public string CompanyName { get; set; }

        [StringLength(100)]
        public string Address { get; set; }

        [StringLength(50)]
        public string Country { get; set; }

        [StringLength(30)]
        public string PhoneNumber { get; set; }

        public string? Website { get; set; }

        public IFormFile? Logo { get; set; }

        public string? About { get; set; }
    }
}
