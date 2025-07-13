using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ProjectAngularApi.Models.Entities;
using ProjectAngularApi.Repositories;
using ProjectAngularApi.Repositories.IRepositories;
using ProjectAngularApi.Service;
using ProjectAngularApi.Service.DB;
using ProjectAngularApi.Service.IServices;
using ProjectAngularApi.Utils;
using System.Configuration;
using System.Text;

namespace ProjectAngularApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var jwtOptions = builder.Configuration.GetSection("Jwt").Get<JWT>();
            builder.Services.AddSingleton(jwtOptions);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(o =>
            {
                var key = Encoding.UTF8.GetBytes(jwtOptions.SigningKey);
                o.RequireHttpsMetadata = false;
                o.SaveToken = true;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtOptions.Issuer, 
                    ValidateAudience = true,
                    ValidAudience = jwtOptions.Audience,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });

            builder.Services.AddOpenApi();
            builder.Services.AddDbContext<AngularContext>(optionsBuilder =>
            {
                optionsBuilder.UseSqlServer(builder.Configuration.GetConnectionString("cs"));
            });
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<AngularContext>();
            builder.Services.AddScoped<IExamRepo, ExamRepo>();
            builder.Services.AddScoped<IExamResultRepo, ExamResultRepo>();
            builder.Services.AddScoped<IOptionRepo, OptionRepo>();
            builder.Services.AddScoped<IQuestionRepo, QuestionRepo>();
            builder.Services.AddScoped<IAuthService, AuthService>();

            builder.Services.AddAuthorization();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp",
                    policy => policy.WithOrigins("http://localhost:4200")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });

            var app = builder.Build();
            app.UseCors("AllowAngularApp");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwaggerUI(op => op.SwaggerEndpoint("/openapi/v1.json", "v1"));
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();

        }
    }
}