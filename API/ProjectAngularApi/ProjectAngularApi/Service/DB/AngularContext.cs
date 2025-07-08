using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjectAngularApi.Models;

namespace ProjectAngularApi.Service.DB
{
    public class AngularContext:IdentityDbContext<ApplicationUser>

    {

        public DbSet<Exam> Exams { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<ExamResult> ExamResults { get; set; }
        public DbSet<Option> Options { get; set; }
        public AngularContext() : base() { }

        public AngularContext(DbContextOptions<AngularContext> options) : base(options) { }

    }
}
