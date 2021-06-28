using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.Domain.Common;

namespace CentralIT.API.AutoMapper.Masters {
    public class CommonProfile : Profile{

        public CommonProfile()
        {
            //Status
            CreateMap<StatusFilterViewModel, StatusFilter>().ReverseMap();
            CreateMap<StatusViewModel, Status>().ReverseMap();

            //Priority
            CreateMap<PriorityFilterViewModel, PriorityFilter>().ReverseMap();
            CreateMap<PriorityViewModel, Priority>().ReverseMap();

            //RequestType
            CreateMap<RequestTypeFilterViewModel, RequestTypeFilter>().ReverseMap();
            CreateMap<RequestTypeViewModel, RequestType>().ReverseMap();
        }
    }
}
