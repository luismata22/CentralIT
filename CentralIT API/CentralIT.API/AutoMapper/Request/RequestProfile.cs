using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Request;
using CentralIT.API.ViewModels.Request.Filters;
using CentralIT.Domain.Request;
using CentralIT.Domain.Requests;

namespace CentralIT.API.AutoMapper.Requestt {
    public class RequestProfile : Profile {

        public RequestProfile()
        {

            CreateMap<RequestFilterViewModel, RequestFilter>().ReverseMap();
            CreateMap<RequestViewModel, Requests>().ReverseMap();
            CreateMap<RequestGetViewModel, RequestGet>().ReverseMap();
            CreateMap<ReportRequestFilterViewModel, ReportRequestFilter>().ReverseMap();
        }
    }
}
