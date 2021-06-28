using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Service;
using CentralIT.Repository.Dao.common;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;
using CentralIT.Repository.Interfaces;
using CentralIT.Repository.Utils;

using Newtonsoft.Json.Linq;

namespace CentralIT.Repository.Implementations.SqlServer.Masters {
    public class SqlServiceRepository : IServiceRepository{

        private IMapper _mapper;
        private IConnector _connector;

        public SqlServiceRepository(IConnector connector, IMapper mapper)
        {
            _mapper = mapper;
            _connector = connector;
        }

        /// <summary>
        /// Metodo para obtener la lista de servicios.
        /// </summary>
        /// <param name="serviceFilter"></param>
        /// <returns></returns>
        public List<Services> GetServices(ServiceFilter serviceFilter)
        {
            var daoFilter = _mapper.Map<ServiceFilterDao>(serviceFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarServicios]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<ServiceDao>());
            var roleDomain = _mapper.Map<List<Services>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para guardar y editar los servicios
        /// </summary>
        /// <param name="service"></param>
        /// <returns></returns>
        public long PostService(Services service, long idUser)
        {
            var dao = _mapper.Map<ServiceDao>(service);
            //dao.CreatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            //dao.UpdatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            var result = _connector.ExecuteWithJsonInput("[Maestro].[spActualizarServicios]", dao, new List<SqlParameter>()
            {
                new SqlParameter("IdUsuario", idUser)
            });

            if (result.IdResponseCode == (int)DatabaseResult.ResponseCodes.Success)
            {
                return result.EntityId;
            }
            else if (result.IdResponseCode == (int)DatabaseResult.ResponseCodes.DuplicatedName)
            {
                return -1;
            }
            else
            {
                return 0;
            }
        }
    }
}
