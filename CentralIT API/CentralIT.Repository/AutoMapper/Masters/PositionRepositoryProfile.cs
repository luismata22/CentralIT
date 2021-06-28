using AutoMapper;

using CentralIT.Domain.Position;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;

namespace CentralIT.Repository.AutoMapper.Masters {
    public class PositionRepositoryProfile : Profile {

        public PositionRepositoryProfile()
        {
            CreateMap<PositionDao, Positions>().ReverseMap();
            CreateMap<PositionFilterDao, PositionFilter>().ReverseMap();
            CreateMap<PositionDepartmentFilterDao, PositionFilter>().ReverseMap();
        }
    }
}
