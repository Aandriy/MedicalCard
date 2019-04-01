using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MedicalCard.Migrations
{
    public partial class extend_user2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Birthday", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "Gender", "LastName", "LockoutEnabled", "LockoutEnd", "MiddleName", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "76348b70-22e5-4a32-9329-ad4120081292", 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "cc8fc7d8-8e14-4a9a-a772-250981ef250f", "a@aa.aa", true, "FirstName", 1, "LastName", true, null, "MiddleName", "A@AA.AA", "A@AA.AA", "AQAAAAEAACcQAAAAEHFMEbVzOio1rYWGj7iGX77teToPw9exHknMoPYnVViLjTKd8lyaM79SYPVhED0QCQ==", null, false, "JQOCVS44PE4WM33DWMKLA4SPHDSQ3VNU", false, "a@aa.aa" });

            migrationBuilder.InsertData(
                table: "AspNetUserClaims",
                columns: new[] { "Id", "ClaimType", "ClaimValue", "UserId" },
                values: new object[] { 1, "http://schemas.microsoft.com/ws/2008/06/identity/claims/role", "Admin", "76348b70-22e5-4a32-9329-ad4120081292" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserClaims",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "76348b70-22e5-4a32-9329-ad4120081292");
        }
    }
}
