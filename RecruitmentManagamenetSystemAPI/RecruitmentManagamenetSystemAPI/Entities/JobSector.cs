using System.ComponentModel.DataAnnotations;

namespace RecruitmentManagamenetSystemAPI.Entities
{
    public class JobSector
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public List<Job> Jobs { get; set; }
    }
}
