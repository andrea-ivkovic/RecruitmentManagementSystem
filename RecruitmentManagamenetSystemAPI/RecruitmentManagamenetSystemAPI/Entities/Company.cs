using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentManagamenetSystemAPI.Entities
{
    public class Company
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string CompanyName { get; set; }

        [StringLength(100)]
        public string Address { get; set; }

        [StringLength(50)]
        public string Country { get; set; }

        [StringLength(30)]
        public string PhoneNumber { get; set; }

        public string? Website { get; set; }

        public string? Logo { get; set; }

        public string? About { get; set; }

        public List<Job> Jobs { get; set; }
    }
}
