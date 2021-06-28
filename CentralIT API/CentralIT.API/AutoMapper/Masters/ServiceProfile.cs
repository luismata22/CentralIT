using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.Domain.Service;

namespace CentralIT.API.AutoMapper.Masters {
    public class ServiceProfile : Profile {

        public ServiceProfile()
        {

            CreateMap<ServiceFilterViewModel, ServiceFilter>().ReverseMap();
            CreateMap<ServiceViewModel, Services>().ReverseMap();
        }
    }
}
