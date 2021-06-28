using System;
using System.Collections.Generic;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Common;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;

namespace CentralIT.Repository.AutoMapper.Masters {
    public class CommonRepositoryProfile : Profile{

        public CommonRepositoryProfile()
        {
            //Status
            CreateMap<StatusDao, Status>().ReverseMap();
            CreateMap<StatusFilterDao, StatusFilter>().ReverseMap();
            
            //Priority
            CreateMap<PriorityDao, Priority>().ReverseMap();
            CreateMap<PriorityFilterDao, PriorityFilter>().ReverseMap();

            //RequestType
            CreateMap<RequestTypeDao, RequestType>().ReverseMap();
            CreateMap<RequestTypeFilterDao, RequestTypeFilter>().ReverseMap();
        }
    }
}
