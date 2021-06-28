using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Security;
using CentralIT.Domain.Login;

namespace CentralIT.API.AutoMapper.Security {
    public class LoginProfile : Profile {
        public LoginProfile()
        {
            CreateMap<LoginViewModel, Login>().ReverseMap();
        }
    }
}
