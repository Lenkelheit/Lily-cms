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
    public class PageFeedbackConfiguration : IEntityTypeConfiguration<PageFeedback>
    {
        public void Configure(EntityTypeBuilder<PageFeedback> builder)
        {
            builder.ToTable(nameof(PageFeedback)).HasKey(e => e.Id);
            builder.Property(e => e.UserEmail).HasMaxLength(256);
            builder.Property(e => e.Comment).HasMaxLength(512);
        }
    }
}
