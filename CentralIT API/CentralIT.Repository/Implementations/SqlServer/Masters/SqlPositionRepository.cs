using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Position;
using CentralIT.Repository.Dao.common;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;
using CentralIT.Repository.Interfaces;
using CentralIT.Repository.Utils;

using Newtonsoft.Json.Linq;

namespace CentralIT.Repository.Implementations.SqlServer.Masters {
    public class SqlPositionRepository : IPositionRepository{

        private IMapper _mapper;
        private IConnector _connector;

        public SqlPositionRepository(IConnector connector, IMapper mapper)
        {
            _mapper = mapper;
            _connector = connector;
        }

        /// <summary>
        /// Metodo para obtener la lista de cargos.
        /// </summary>
        /// <param name="positionFilter"></param>
        /// <returns></returns>
        public List<Positions> GetPositions(PositionFilter positionFilter)
        {
            var daoFilter = _mapper.Map<PositionFilterDao>(positionFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarCargos]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<PositionDao>());
            var roleDomain = _mapper.Map<List<Positions>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para guardar y editar los departamentos
        /// </summary>
        /// <param name="position"></param>
        /// <returns></returns>
        public long PostPosition(Positions position, long idUser)
        {
            var dao = _mapper.Map<PositionDao>(position);
            //dao.CreatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            //dao.UpdatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            var result = _connector.ExecuteWithJsonInput("[Maestro].[spActualizarCargos]", dao, new List<SqlParameter>()
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

        /// <summary>
        /// Metodo para obtener la lista de cargos por departamentos.
        /// </summary>
        /// <param name="positionFilter"></param>
        /// <returns></returns>
        public List<Positions> GetPositionDepartment(PositionFilter positionFilter)
        {
            var daoFilter = _mapper.Map<PositionDepartmentFilterDao>(positionFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarCargosxDepartamentos]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<PositionDao>());
            var roleDomain = _mapper.Map<List<Positions>>(roleDao.ToList());
            return roleDomain;
        }
    }
}
