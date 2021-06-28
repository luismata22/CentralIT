using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Common;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;
using CentralIT.Repository.Interfaces;
using CentralIT.Repository.Utils;

using Newtonsoft.Json.Linq;

namespace CentralIT.Repository.Implementations.SqlServer.Masters {
    public class SqlCommonRepository : ICommonRepository{

        private IMapper _mapper;
        private IConnector _connector;

        public SqlCommonRepository(IConnector connector, IMapper mapper)
        {
            _mapper = mapper;
            _connector = connector;
        }

        /// <summary>
        /// Metodo para obtener la lista de estatus.
        /// </summary>
        /// <param name="departmentFilter"></param>
        /// <returns></returns>
        public List<Status> GetStatues(StatusFilter statusFilter)
        {
            var daoFilter = _mapper.Map<StatusFilterDao>(statusFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarEstatus]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<StatusDao>());
            var roleDomain = _mapper.Map<List<Status>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para obtener la lista de prioridades.
        /// </summary>
        /// <param name="priorityFilter"></param>
        /// <returns></returns>
        public List<Priority> GetPriorities(PriorityFilter priorityFilter)
        {
            var daoFilter = _mapper.Map<PriorityFilterDao>(priorityFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarPrioridades]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<PriorityDao>());
            var roleDomain = _mapper.Map<List<Priority>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para obtener la lista de tipos de solicitudes.
        /// </summary>
        /// <param name="requestTypeFilter"></param>
        /// <returns></returns>
        public List<RequestType> GetRequestTypes(RequestTypeFilter requestTypeFilter)
        {
            var daoFilter = _mapper.Map<RequestTypeFilterDao>(requestTypeFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarTiposSolicitud]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<RequestTypeDao>());
            var roleDomain = _mapper.Map<List<RequestType>>(roleDao.ToList());
            return roleDomain;
        }
    }
}
