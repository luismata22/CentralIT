using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Department;
using CentralIT.Repository.Dao.common;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;
using CentralIT.Repository.Interfaces;
using CentralIT.Repository.Utils;

using Newtonsoft.Json.Linq;

namespace CentralIT.Repository.Implementations.SqlServer.Masters {
    public class SqlDepartmentRepository : IDepartmentRepository{

        private IMapper _mapper;
        private IConnector _connector;

        public SqlDepartmentRepository(IConnector connector, IMapper mapper)
        {
            _mapper = mapper;
            _connector = connector;
        }

        /// <summary>
        /// Metodo para obtener la lista de departamentos.
        /// </summary>
        /// <param name="departmentFilter"></param>
        /// <returns></returns>
        public List<Departments> GetDepartments(DepartmentFilter departmentFilter)
        {
            var daoFilter = _mapper.Map<DepartmentFilterDao>(departmentFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarDepartamentos]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<DepartmentDao>());
            var roleDomain = _mapper.Map<List<Departments>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para guardar y editar los departamentos
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        public long PostDepartment(Departments department, long idUser)
        {
            var dao = _mapper.Map<DepartmentDao>(department);
            //dao.CreatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            //dao.UpdatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            var result = _connector.ExecuteWithJsonInput("[Maestro].[SpActualizarDepartamentos]", dao, new List<SqlParameter>()
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
