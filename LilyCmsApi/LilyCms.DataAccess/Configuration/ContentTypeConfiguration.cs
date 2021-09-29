using LilyCms.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Configuration
{
    public class ContentTypeConfiguration : IEntityTypeConfiguration<ContentType>
    {
        public void Configure(EntityTypeBuilder<ContentType> builder)
        {
            builder.ToTable(nameof(ContentType)).HasKey(e => e.Id);
            builder.Property(e => e.Id).HasConversion<int>();
            builder.Property(e => e.Name).IsRequired().HasMaxLength(128);
            builder.Property(e => e.Description).HasMaxLength(512);

            builder.HasData(
                new ContentType
                {
                    Id = Models.Enums.ContentType.HtmlContent,
                    Name = "Html Content",
                    Description = "Displays HTML content"
                },
                new ContentType
                {
                    Id = Models.Enums.ContentType.Feedback,
                    Name = "Feedback Content",
                    Description = "Displays Feedback content"
                });
        }
    }
}
