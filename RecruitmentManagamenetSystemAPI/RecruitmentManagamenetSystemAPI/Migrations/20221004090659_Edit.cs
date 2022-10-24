using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentManagamenetSystemAPI.Migrations
{
    public partial class Edit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AssesmentScore",
                table: "ApplicantsJobs",
                newName: "AssessmentScore");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AssessmentScore",
                table: "ApplicantsJobs",
                newName: "AssesmentScore");
        }
    }
}
