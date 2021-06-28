using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.Domain.Department;

namespace CentralIT.API.AutoMapper.Masters {
    public class DepartmentProfile : Profile {

        public DepartmentProfile()
        {

            CreateMap<DepartmentFilterViewModel, DepartmentFilter>().ReverseMap();
            CreateMap<DepartmentViewModel, Departments>().ReverseMap();
        }
    }
}
