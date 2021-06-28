using AutoMapper;

using CentralIT.Domain.Service;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;

namespace CentralIT.Repository.AutoMapper.Masters {
    public class ServiceRepositoryProfile : Profile {

        public ServiceRepositoryProfile()
        {
            CreateMap<ServiceDao, Services>().ReverseMap();
            CreateMap<ServiceFilterDao, ServiceFilter>().ReverseMap();
        }
    }
}
