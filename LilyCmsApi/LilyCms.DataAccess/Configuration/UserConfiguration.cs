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
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable(nameof(User)).HasKey(e => e.Id);
            builder.Property(e => e.FirstName).IsRequired().HasMaxLength(256);
            builder.Property(e => e.LastName).IsRequired().HasMaxLength(256);
            builder.Property(e => e.Email).IsRequired().HasMaxLength(256);

            builder.HasMany(e => e.Sites).WithOne(e => e.User).HasForeignKey(e => e.UserId);
        }
    }
}
