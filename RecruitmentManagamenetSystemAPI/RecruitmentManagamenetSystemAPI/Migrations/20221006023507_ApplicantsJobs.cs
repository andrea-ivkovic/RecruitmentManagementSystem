using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentManagamenetSystemAPI.Migrations
{
    public partial class ApplicantsJobs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "AssessmentScore",
                table: "ApplicantsJobs",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "AssessmentScore",
                table: "ApplicantsJobs",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);
        }
    }
}
