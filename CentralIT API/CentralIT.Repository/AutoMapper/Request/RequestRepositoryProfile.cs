using System;
using System.Collections.Generic;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Request;
using CentralIT.Domain.Requests;
using CentralIT.Repository.Dao.Request;
using CentralIT.Repository.Dao.Request.Filters;

namespace CentralIT.Repository.AutoMapper.Request {
    public class RequestRepositoryProfile : Profile{

        public RequestRepositoryProfile()
        {
            CreateMap<RequestDao, Requests>().ReverseMap();
            CreateMap<RequestGetDao, RequestGet>().ReverseMap();
            CreateMap<RequestFilterDao, RequestFilter>().ReverseMap();
            CreateMap<ReportRequestFilterDao, ReportRequestFilter>().ReverseMap();
        }
    }
}
