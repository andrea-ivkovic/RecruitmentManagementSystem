namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class ApplicantJobCreationDTO
    {
        public string? UserId { get; set; }

        public int JobId { get; set; }

        public DateTime DateOfApplication { get; set; }

        public double? AssessmentScore { get; set; }

    }
}
