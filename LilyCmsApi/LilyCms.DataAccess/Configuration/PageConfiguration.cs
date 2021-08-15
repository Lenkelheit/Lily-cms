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
    public class PageConfiguration : IEntityTypeConfiguration<Page>
    {
        public void Configure(EntityTypeBuilder<Page> builder)
        {
            builder.ToTable(nameof(Page)).HasKey(e => e.Id);
            builder.Property(e => e.Title).IsRequired().HasMaxLength(256);
            builder.Property(e => e.Description).HasMaxLength(512);
            builder.Property(e => e.UrlSlug).HasMaxLength(64);

            builder.HasMany(e => e.PageAreas).WithOne(e => e.Page).HasForeignKey(e => e.PageId);
        }
    }
}
