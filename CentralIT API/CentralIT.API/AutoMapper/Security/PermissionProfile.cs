using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Security;
using CentralIT.Domain.Permissions;

namespace CentralIT.API.AutoMapper.Security {
    public class PermissionProfile : Profile {

        public PermissionProfile()
        {
            CreateMap<PermissionViewModel, Permission>().ReverseMap();
        }
    }
}
