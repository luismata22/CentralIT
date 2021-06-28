using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.Domain.Position;

namespace CentralIT.API.AutoMapper.Masters {
    public class PositionProfile : Profile {

        public PositionProfile()
        {

            CreateMap<PositionFilterViewModel, PositionFilter>().ReverseMap();
            CreateMap<PositionViewModel, Positions>().ReverseMap();
        }
    }
}
