namespace RecruitmentManagamenetSystemAPI.DTOs
{
    public class CompanyDTO
    {
        public int Id { get; set; }

        public string CompanyName { get; set; }
       
        public string Address { get; set; }

        public string Country { get; set; }

        public string PhoneNumber { get; set; }

        public string? Website { get; set; }

        public string? Logo { get; set; }

        public string? About { get; set; }
    }
}
