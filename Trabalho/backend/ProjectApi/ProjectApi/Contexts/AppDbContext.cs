using Microsoft.EntityFrameworkCore;
using ProjectApi.Models;

namespace ProjectApi.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Project>().ToTable("Projects");
            builder.Entity<Project>().HasKey(p => p.Id);
            builder.Entity<Project>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Project>().Property(p => p.Name).IsRequired().HasMaxLength(30);
            builder.Entity<Project>().Property(p => p.Description).IsRequired().HasMaxLength(100);

        }
    }
}
