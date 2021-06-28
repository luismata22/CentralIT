using AutoMapper;

using CentralIT.Domain.Department;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;

namespace CentralIT.Repository.AutoMapper.Masters {
    public class DepartmentRepositoryProfile : Profile {

        public DepartmentRepositoryProfile()
        {
            CreateMap<DepartmentDao, Departments>().ReverseMap();
            CreateMap<DepartmentFilterDao, DepartmentFilter>().ReverseMap();
            
        }
    }
}
