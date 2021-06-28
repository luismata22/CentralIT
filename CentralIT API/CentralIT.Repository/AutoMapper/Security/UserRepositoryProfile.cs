using AutoMapper;

using CentralIT.Domain.Users;
using CentralIT.Domain.Users.Roles;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;
using CentralIT.Repository.Dao.security;
using CentralIT.Repository.Dao.security.Filters;

namespace CentralIT.Repository.AutoMapper.Security {
    public class UserRepositoryProfile : Profile {

        public UserRepositoryProfile()
        {
            CreateMap<UserDao, User>().ReverseMap();
            CreateMap<UserFilterDao, UserFilter>().ReverseMap();

            CreateMap<DocumentTypeDao, DocumentType>().ReverseMap();
            CreateMap<DocumentTypeFilterDao, DocumentTypeFilter>().ReverseMap();

            CreateMap<RoleDao, Role>().ReverseMap();
            CreateMap<RoleFilterDao, RoleFilter>().ReverseMap();

            CreateMap<UserNewPasswordDao, UserNewPassword>().ReverseMap();
        }
    }
}
