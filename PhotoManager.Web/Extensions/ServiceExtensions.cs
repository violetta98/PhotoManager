using System;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using PhotoManager.MongoRepositories;
using PhotoManager.MongoRepositories.Options;
using PhotoManager.MongoRepositories.Repositories;
using PhotoManager.Web.Filters;

namespace PhotoManager.Web.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureAuthOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(x => new AuthOptions
            {
                Issuer = configuration.GetSection("AuthOptions:Issuer").Value,
                Audience = configuration.GetSection("AuthOptions:Audience").Value,
                Key = configuration.GetSection("AuthOptions:Key").Value,
                Lifetime = Convert.ToInt32(configuration.GetSection("AuthOptions:Lifetime").Value)
            });
        }

        public static void ConfigureAuthentication(this IServiceCollection services)
        {
            var authOptions = services.BuildServiceProvider().GetService<AuthOptions>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOptions.Issuer,
                        ValidateAudience = true,
                        ValidAudience = authOptions.Audience,
                        ValidateLifetime = true,
                        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true
                    };
                });
        }

        public static void ConfigureSpaStaticFiles(this IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public static void ConfigureMongoOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(x => new MongoOptions(configuration.GetSection("MongoConnection:ConnectionString").Value));
        }

        public static void ConfigureDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<PhotoManagerContext>();

            services.AddTransient(x => new Cloudinary(
                new Account
                {
                    Cloud = configuration.GetSection("CloudinaryAccount:Cloud").Value,
                    ApiKey = configuration.GetSection("CloudinaryAccount:ApiKey").Value,
                    ApiSecret = configuration.GetSection("CloudinaryAccount:ApiSecret").Value
                }
            ));

            services.AddTransient<AuthRepository>();
            services.AddTransient<PhotoRepository>();
            services.AddTransient<AlbumRepository>();
        }

        public static void ConfigureModelStateValidation(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(ValidateModelStateAttribute));
            });
        }
    }
}
