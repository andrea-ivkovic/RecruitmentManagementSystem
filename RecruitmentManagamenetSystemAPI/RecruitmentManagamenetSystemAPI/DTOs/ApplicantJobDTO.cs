namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class ApplicantJobDTO
    {
        public string  FirstName { get; set; }

        public string LastName { get; set; }

        public double? AssessmentScore { get; set; }

        public DateTime DateOfApplication { get; set; }

        public string UserId { get; set; }
    }
}
