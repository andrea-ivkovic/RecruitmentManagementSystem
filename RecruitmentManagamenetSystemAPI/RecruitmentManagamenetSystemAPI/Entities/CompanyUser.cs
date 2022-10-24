using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentManagamenetSystemAPI.Entities
{
    public class CompanyUser
    {
        [ForeignKey(nameof(IdentityUser))]
        public string UserId { get; set; }

        public IdentityUser IdentityUser { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        [ForeignKey(nameof(Company))]
        public int CompanyId { get; set; }

        public Company Company { get; set; }

    }
}
