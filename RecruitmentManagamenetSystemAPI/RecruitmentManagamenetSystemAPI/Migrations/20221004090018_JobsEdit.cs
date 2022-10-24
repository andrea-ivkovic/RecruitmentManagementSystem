using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentManagamenetSystemAPI.Migrations
{
    public partial class JobsEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicantsJobs_AspNetUsers_UserId",
                table: "ApplicantsJobs");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicantsJobs_Applicants_UserId",
                table: "ApplicantsJobs",
                column: "UserId",
                principalTable: "Applicants",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicantsJobs_Applicants_UserId",
                table: "ApplicantsJobs");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicantsJobs_AspNetUsers_UserId",
                table: "ApplicantsJobs",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
