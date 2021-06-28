using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.API.ViewModels.Security;
using CentralIT.API.ViewModels.Security.Filters;
using CentralIT.Domain.Users;
using CentralIT.Domain.Users.Roles;

namespace CentralIT.API.AutoMapper.Security {
    public class UserProfile : Profile {

        public UserProfile()
        {

            CreateMap<UserFilterViewModel, UserFilter>().ReverseMap();
            CreateMap<UserViewModel, User>().ReverseMap();

            CreateMap<DocumentTypeFilterViewModel, DocumentTypeFilter>().ReverseMap();
            CreateMap<DocumentTypeViewModel, DocumentType>().ReverseMap();

            CreateMap<RoleFilterViewModel, RoleFilter>().ReverseMap();
            CreateMap<RoleViewModel, Role>().ReverseMap();

            CreateMap<UserNewPasswordViewModel, UserNewPassword>().ReverseMap();
        }
    }
}
