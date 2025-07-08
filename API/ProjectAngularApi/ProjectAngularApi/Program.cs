using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ProjectAngularApi.Repositories.IRepositories;
using ProjectAngularApi.Repositories;
using ProjectAngularApi.Service.DB;

namespace ProjectAngularApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<AngularContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(builder.Configuration.GetConnectionString("cs"));
            });
            builder.Services.AddScoped<IExamRepo, ExamRepo>();
            builder.Services.AddScoped<IExamResultRepo,ExamResultRepo >();
            builder.Services.AddScoped<IOptionRepo, OptionRepo>();
            builder.Services.AddScoped<IQuestionRepo, QuestionRepo>();





            var app = builder.Build();
          


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();

                // The path should be "/openapi/v1.json"
                app.UseSwaggerUI(op => op.SwaggerEndpoint("/openapi/v1.json", "v1"));
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();

        }
    }
}