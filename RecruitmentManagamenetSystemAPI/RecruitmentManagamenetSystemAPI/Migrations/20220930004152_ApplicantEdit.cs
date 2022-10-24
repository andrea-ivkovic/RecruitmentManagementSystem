using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentManagamenetSystemAPI.Migrations
{
    public partial class ApplicantEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Education",
                table: "Applicants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkExperience",
                table: "Applicants",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Education",
                table: "Applicants");

            migrationBuilder.DropColumn(
                name: "WorkExperience",
                table: "Applicants");
        }
    }
}
