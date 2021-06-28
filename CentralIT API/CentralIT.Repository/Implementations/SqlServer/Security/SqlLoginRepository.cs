using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Login;
using CentralIT.Domain.Users;
using CentralIT.Repository.Dao.common;
using CentralIT.Repository.Dao.security;
using CentralIT.Repository.Interfaces;
using CentralIT.Repository.Utils;

using Newtonsoft.Json;

namespace CentralIT.Repository.Implementations.SqlServer.Security {
    public class SqlLoginRepository : ILoginRepository {
        
        private IMapper _mapper;
        private readonly IConnector _conection;

        public SqlLoginRepository(IConnector conection,IMapper mapper)
        {
            _conection = conection;
            _mapper = mapper;
        }

        public User UserLogin(string email, string password)
        {
            List<SqlParameter> parameters = new List<SqlParameter>
            {
                new SqlParameter { ParameterName = "@Correo", Value = email, Direction = ParameterDirection.Input },
                new SqlParameter { ParameterName = "@ClaveAcceso", Value = Encoding.ASCII.GetBytes(password), Direction = ParameterDirection.Input }
            };

            var query = @"SELECT [Seguridad].[fnValidarLogin](@Correo,@ClaveAcceso);";

            var result = _conection.ExecuteScalar(query, null, parameters, false);

            if (result == (long)ResultDBType.Error)
                return null;

            var userFilter = new UserFilter { UserId = result };
            return GetAllUsers(userFilter).FirstOrDefault();
        }

        public List<User> GetAllUsers(UserFilter userFilter = null)
        {
            try
            {
                var parameters = GetAllUsersParameters(userFilter);

                var dsResult = _conection.GetJson("[Seguridad].[spConsultarUsuarios]", parameters);
                var roleDao = JsonUtils.DeserializeObjectOrDefault(dsResult, new List<UserDao>()).ToList();
                var roleDomain = _mapper.Map<List<User>>(roleDao.ToList());
                return roleDomain;
            }
            catch (Exception)
            {
                return null;
            }
        }

        private List<SqlParameter> GetAllUsersParameters(UserFilter userFilter)
        {
            List<SqlParameter> parameters = new List<SqlParameter>();

            if (userFilter != null)
            {
                parameters.Add(new SqlParameter() { ParameterName = "@IndActivo", Value = -1 });

                if (userFilter.UserId > 0)
                    parameters.Add(new SqlParameter() { ParameterName = "@IdUsuario", Value = userFilter.UserId });
                if (!string.IsNullOrEmpty(userFilter.Email))
                    parameters.Add(new SqlParameter() { ParameterName = "@Correo", Value = userFilter.Email });
            }

            return parameters;
        }

        public int RefreshToken(string refreshToken)
        {
            throw new NotImplementedException();
        }

    }
}
