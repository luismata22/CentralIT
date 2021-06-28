using System;
using System.Collections.Generic;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Permissions;
using CentralIT.Repository.Dao.security;

namespace CentralIT.Repository.AutoMapper.Security {
    public class PermissionRepositoryProfile : Profile {

        public PermissionRepositoryProfile()
        {
            CreateMap<PermissionDao, Permission>().ReverseMap();
        }
    }
}
