using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using CentralIT.Domain.Common;
using CentralIT.Domain.Department;
using CentralIT.Domain.Login;
using CentralIT.Domain.Permissions;
using CentralIT.Domain.Position;
using CentralIT.Domain.Requests;
using CentralIT.Domain.Security;
using CentralIT.Domain.Service;
using CentralIT.Domain.Users;
using CentralIT.Repository.AutoMapper.Masters;
using CentralIT.Repository.AutoMapper.Request;
using CentralIT.Repository.AutoMapper.Security;
using CentralIT.Repository.Implementations.SqlServer;
using CentralIT.Repository.Implementations.SqlServer.Masters;
using CentralIT.Repository.Implementations.SqlServer.Request;
using CentralIT.Repository.Implementations.SqlServer.Security;
using CentralIT.Repository.Interfaces;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;


namespace CentralIT.API.ApiConfiguration
{
    public static class ServiceConfiguration
    {
        private const string AllowSpecificOrigins = "AllowAllOrigin";

        internal static void ConfigureDependencies(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));

            // Security
            
            //Login
            services.AddTransient<ILoginService, LoginService>();
            services.AddTransient<ILoginRepository, SqlLoginRepository>();
            services.AddScoped<IJWTGenerator, JWTGeneratorService>();
            services.AddTransient<IConnector, SqlConnector>();
            services.AddTransient<IPasswordConfiguration, PasswordConfigurationService>();

            //User
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserRepository, SqlUserRepository>();
            services.AddAutoMapper(typeof(UserRepositoryProfile).Assembly);

            //Permission
            services.AddTransient<IPermissionService, PermissionService>();
            services.AddTransient<IPermissionRepository, SqlPermissionRepository>();
            services.AddAutoMapper(typeof(PermissionRepositoryProfile).Assembly);

            ////////

            //Masters

            //Common
            services.AddTransient<ICommonService, CommonService>();
            services.AddTransient<ICommonRepository, SqlCommonRepository>();
            services.AddAutoMapper(typeof(CommonRepositoryProfile).Assembly);
            
            //Department
            services.AddTransient<IDepartmentService, DepartmentService>();
            services.AddTransient<IDepartmentRepository, SqlDepartmentRepository>();
            services.AddAutoMapper(typeof(DepartmentRepositoryProfile).Assembly);

            //Position
            services.AddTransient<IPositionService, PositionService>();
            services.AddTransient<IPositionRepository, SqlPositionRepository>();
            services.AddAutoMapper(typeof(PositionRepositoryProfile).Assembly);

            //Service
            services.AddTransient<IServiceService, ServiceService>();
            services.AddTransient<IServiceRepository, SqlServiceRepository>();
            services.AddAutoMapper(typeof(ServiceRepositoryProfile).Assembly);

            //Request
            services.AddTransient<IRequestService, RequestService>();
            services.AddTransient<IRequestRepository, SqlRequestRepository>();
            services.AddAutoMapper(typeof(RequestRepositoryProfile).Assembly);
        }

        internal static void ConfigureLocalization(this IServiceCollection services)
        {
            services.AddLocalization(opt => opt.ResourcesPath = "Resources");
            services.Configure<RequestLocalizationOptions>(options =>
            {
                List<CultureInfo> supportedCultures = new List<CultureInfo>();
                options.DefaultRequestCulture = new RequestCulture("es");
                options.SupportedCultures = supportedCultures;
            });
        }

        internal static void UseExceptionMiddleware(this IApplicationBuilder app) => app.UseMiddleware(typeof(ExceptionHandler));

        internal static void UseLocalization(this IApplicationBuilder app)
        {
            IOptions<RequestLocalizationOptions> localizedOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(localizedOptions.Value);
        }

        internal static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy(
                AllowSpecificOrigins,
                builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                }));
        }

        internal static void UseCorsDev(this IApplicationBuilder app) => app.UseCors(AllowSpecificOrigins);
    }
}
