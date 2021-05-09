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
    public class SiteConfiguration : IEntityTypeConfiguration<Site>
    {
        public void Configure(EntityTypeBuilder<Site> builder)
        {
            builder.ToTable(nameof(Site)).HasKey(e => e.Id);
            builder.Property(e => e.Title).IsRequired().HasMaxLength(256);
            builder.Property(e => e.Description).HasMaxLength(512);
            builder.Property(e => e.UrlSlug).IsRequired().HasMaxLength(64);

            builder.HasMany(e => e.Pages).WithOne(e => e.Site).HasForeignKey(e => e.SiteId);
        }
    }
}
