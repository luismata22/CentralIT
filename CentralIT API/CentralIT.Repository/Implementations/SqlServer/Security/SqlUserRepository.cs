using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

using AutoMapper;

using CentralIT.Domain.Users;
using CentralIT.Domain.Users.Roles;
using CentralIT.Repository.Dao.common;
using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.Masters.Filters;
using CentralIT.Repository.Dao.security;
using CentralIT.Repository.Dao.security.Filters;
using CentralIT.Repository.Interfaces;
using CentralIT.Repository.Utils;

using Newtonsoft.Json.Linq;

namespace CentralIT.Repository.Implementations.SqlServer.Security {
    public class SqlUserRepository : IUserRepository{

        private IMapper _mapper;
        private IConnector _connector;

        public SqlUserRepository(IConnector connector, IMapper mapper)
        {
            _mapper = mapper;
            _connector = connector;
        }

        /// <summary>
        /// Metodo para obtener la lista de usuarios.
        /// </summary>
        /// <param name="userFilter"></param>
        /// <returns></returns>
        public List<User> GetUsers(UserFilter userFilter)
        {
            var daoFilter = _mapper.Map<UserFilterDao>(userFilter);
            var dataSet = _connector.GetJson(
                "[Seguridad].[spConsultarUsuarios]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<UserDao>());
            var roleDomain = _mapper.Map<List<User>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para guardar y editar los usuarios
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long PostUser(User user, long idUser)
        {
            var dao = _mapper.Map<UserDao>(user);
            //dao.CreatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            //dao.UpdatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            var result = _connector.ExecuteWithJsonInput("[Seguridad].[spActualizarUsuario]", dao, new List<SqlParameter>()
            {
                new SqlParameter("IdUsuario", idUser),
                new SqlParameter("ClaveAcceso", Encoding.ASCII.GetBytes(user.Password))
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
        /// Metodo para obtener la lista de tipos de documentos.
        /// </summary>
        /// <param name="documentTypeFilter"></param>
        /// <returns></returns>
        public List<DocumentType> GetDocumentTypes(DocumentTypeFilter documentTypeFilter)
        {
            var daoFilter = _mapper.Map<DocumentTypeFilterDao>(documentTypeFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarTipoDocumento]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<DocumentTypeDao>());
            var roleDomain = _mapper.Map<List<DocumentType>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para obtener la lista de roles.
        /// </summary>
        /// <param name="documentTypeFilter"></param>
        /// <returns></returns>
        public List<Role> GetRoles(RoleFilter roleFilter)
        {
            var daoFilter = _mapper.Map<RoleFilterDao>(roleFilter);
            var dataSet = _connector.GetJson(
                "[Maestro].[spConsultarRoles]",
                JObject.FromObject(daoFilter));
            var roleDao = JsonUtils.DeserializeObjectOrDefault(dataSet, new List<RoleDao>());
            var roleDomain = _mapper.Map<List<Role>>(roleDao.ToList());
            return roleDomain;
        }

        /// <summary>
        /// Metodo para guardar y editar los roles por usuarios
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long PostRoleUser(User user, long idUser)
        {
            var dao = _mapper.Map<UserDao>(user);
            //dao.CreatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            //dao.UpdatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            var result = _connector.ExecuteWithJsonInput("[Seguridad].[spActualizarRolesxUsuarios]", dao, new List<SqlParameter>()
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
        /// Metodo para cambiar la contrasena del usuario
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long PostNewPassword(User user, long idUser)
        {
            var dao = _mapper.Map<UserDao>(user);
            //dao.CreatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            //dao.UpdatedDate = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            var result = _connector.ExecuteWithJsonInput("[Seguridad].[spActualizarClaveAcceso]", dao, new List<SqlParameter>()
            {
                new SqlParameter("IdUsuario", idUser),
                new SqlParameter("ClaveAcceso", Encoding.ASCII.GetBytes(user.Password))
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
        /// Metodo para cambiar la contrasena del usuario desde el perfil
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long PostNewPasswordUser(UserNewPassword user, long idUser)
        {
            var dao = _mapper.Map<UserNewPasswordDao>(user);
            var result = _connector.ExecuteWithJsonInput("[Seguridad].[spActualizarClaveAccesoPerfil]", dao, new List<SqlParameter>()
            {
                new SqlParameter("IdUsuario", idUser),
                new SqlParameter("ActualClaveAcceso", Encoding.ASCII.GetBytes(user.AcctualityPassword)),
                new SqlParameter("NuevaClaveAcceso", Encoding.ASCII.GetBytes(user.NewPassword))
            });

            if (result.IdResponseCode == (int)DatabaseResult.ResponseCodes.Success)
            {
                return result.EntityId;
            }
            else if (result.IdResponseCode == (int)DatabaseResult.ResponseCodes.PasswordEqual)
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
