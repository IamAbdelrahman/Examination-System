using Microsoft.EntityFrameworkCore.Migrations;
using ProjectAngularApi.Models.Enums;
#nullable disable

namespace ProjectAngularApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
                values: new object[]
                {
                    Guid.NewGuid().ToString(),
                    UserRole.Admin.ToString(),
                    UserRole.Admin.ToString().ToUpper(),
                    Guid.NewGuid().ToString()
                }
            );

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
                values: new object[]
                {
                    Guid.NewGuid().ToString(),
                    UserRole.Student.ToString(),
                    UserRole.Student.ToString().ToUpper(),
                    Guid.NewGuid().ToString()
                }
);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [AspNetRoles]");
        }
    }
}