namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class JobDTO
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }

        public string CompanyName { get; set; }

        public string? Logo { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string SkillsAndRequirements { get; set; }

        public int JobSectorId { get; set; }

        public string JobSector { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool Archived { get; set; }
    }
}
