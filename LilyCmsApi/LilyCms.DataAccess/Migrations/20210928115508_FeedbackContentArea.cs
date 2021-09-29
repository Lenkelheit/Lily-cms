using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LilyCms.DataAccess.Migrations
{
    public partial class FeedbackContentArea : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PageFeedback",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Vote = table.Column<bool>(type: "bit", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    ModifiedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    PageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageFeedback", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PageFeedback_Page_PageId",
                        column: x => x.PageId,
                        principalTable: "Page",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ContentType",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 2, "Displays Feedback content", "Feedback Content" });

            migrationBuilder.CreateIndex(
                name: "IX_PageFeedback_PageId",
                table: "PageFeedback",
                column: "PageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PageFeedback");

            migrationBuilder.DeleteData(
                table: "ContentType",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
