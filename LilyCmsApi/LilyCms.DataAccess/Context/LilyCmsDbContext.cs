using LilyCms.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Context
{
    public class LilyCmsDbContext : DbContext
    {
        public LilyCmsDbContext(DbContextOptions<LilyCmsDbContext> options) : base(options) { }

        public DbSet<Site> Sites { get; set; }
        public DbSet<Page> Pages { get; set; }
        public DbSet<PageArea> PageAreas { get; set; }
        public DbSet<ContentType> ContentTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(LilyCmsDbContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
