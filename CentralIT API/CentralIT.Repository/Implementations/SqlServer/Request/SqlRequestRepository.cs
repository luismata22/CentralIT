using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Request;
using CentralIT.Domain.Requests;
using CentralIT.Repository.Dao.common;
using CentralIT.Repository.Dao.Request;
using CentralIT.Repository.Dao.Request.Filters;
using CentralIT.Repository.Interfaces;
using CentralIT.Repository.Utils;

using Newtonsoft.Json.Linq;

namespace CentralIT.Repository.Implementations.SqlServer.Request {
    public class SqlRequestRepository : IRequestRepository{

        private IMapper _mapper;
        private IConnector _connector;

        public SqlRequestRepository(IConnector connector, IMapper mapper)
        {
            _mapper = mapper;
            _connector = connector;
        }

        /// <summary>
        /// Metodo para obtener la lista de solictudes.
        /// </summary>
        /// <param name="requestFilter"></param>
        /// <returns></returns>
        public List<RequestGet> GetRequests(RequestFilter requestFilter)
        {
            var daoFilter = _mapper.Map<RequestFilterDao>(requestFilter);
            var dataSet = _connector.GetJson(
                "[Transaccional].[spConsultarSolicitudes]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<RequestGetDao>());
            var roleDomain = _mapper.Map<List<RequestGet>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para obtener los reportes de las solictudes
        /// </summary>
        /// <param name="reportrequestFilter"></param>
        /// <returns></returns>
        public List<RequestGet> GetReportsRequests(ReportRequestFilter reportrequestFilter)
        {
            var daoFilter = _mapper.Map<ReportRequestFilterDao>(reportrequestFilter);
            var dataSet = _connector.GetJson(
                "[Transaccional].[spConsultarReporteSolicitudes]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<RequestGetDao>());
            var roleDomain = _mapper.Map<List<RequestGet>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para guardar y editar los solicitudes
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public long PostRequest(Requests request, long idUser)
        {
            var dao = _mapper.Map<RequestDao>(request);
            //dao.CreatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            //dao.UpdatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            var result = _connector.ExecuteWithJsonInput("[Transaccional].[spActualizarSolicitudes]", dao, new List<SqlParameter>()
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
