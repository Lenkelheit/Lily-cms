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
    public class PageAreaConfiguration : IEntityTypeConfiguration<PageArea>
    {
        public void Configure(EntityTypeBuilder<PageArea> builder)
        {
            builder.ToTable(nameof(PageArea)).HasKey(e => e.Id);
            builder.Property(e => e.Title).IsRequired().HasMaxLength(256);
            builder.Property(e => e.Description).HasMaxLength(512);
            builder.Property(e => e.ContentType).HasConversion<int>();

            builder.HasOne(e => e.ContentTypeRelation).WithMany().HasForeignKey(e => e.ContentType);
        }
    }
}
