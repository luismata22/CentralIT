using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Permissions;
using CentralIT.Repository.Dao.security;
using CentralIT.Repository.Interfaces;

using Newtonsoft.Json;

namespace CentralIT.Repository.Implementations.SqlServer.Security {
    public class SqlPermissionRepository  : IPermissionRepository {

        private readonly IConnector _connector;

        private readonly IMapper _mapper;

        public SqlPermissionRepository(IConnector connector, IMapper mapper)
        {
            _connector = connector;
            _mapper = mapper;
        }
        public List<Permission> GetPermissionByUser(int idUser)
        {
            var parameters = new List<SqlParameter>
            {
                new SqlParameter("@IdUsuario", idUser)
            };
            var dataSet = _connector.GetJson("[Seguridad].[spConsultarPermisosxUsuario]", parameters);
            var permissionDao = JsonConvert.DeserializeObject<IEnumerable<PermissionDao>>(dataSet);
            var permissionDomain = new List<Permission>();

            if (permissionDao != null)
            {
               permissionDomain = _mapper.Map<List<Permission>>(permissionDao.ToList());
            }

            return permissionDomain;
        }
    }
}
