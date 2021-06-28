using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Exceptions;
using CentralIT.Domain.Security;
using CentralIT.Domain.Users.Roles;

namespace CentralIT.Domain.Users {
    public class UserService : IUserService{

        private readonly IUserRepository _userRepository;
        private readonly IPasswordConfiguration _passwordConfiguration;

        public UserService(IUserRepository userRepository, IPasswordConfiguration passwordConfiguration)
        {
            this._userRepository = userRepository;
            this._passwordConfiguration = passwordConfiguration;
        }

        /// <summary>
        /// Metodo para obtener la lista de usuarios
        /// </summary>
        /// <param name="userFilter"></param>
        /// <returns></returns>
        public List<User> GetUsers(UserFilter userFilter)
        {
            return _userRepository.GetUsers(userFilter);
        }

        /// <summary>
        /// Metodo para guardar y editar los usuarios
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        public long PostUser(User user, long idUser)
        {
            if (user == null)
                throw new ArgumentsNullException();

            var passwordValue = _passwordConfiguration.GeneratePassword(user);
            user.Password = _passwordConfiguration.EncryptPassword(passwordValue);
            var result = _userRepository.PostUser(user, idUser);
            return result;
        }

         /// <summary>
        /// Metodo para obtener la lista de tipos de documentos
        /// </summary>
        /// /// <param name="documentTypeFilter"></param>
        /// <returns></returns>
        public List<DocumentType> GetDocumentTypes(DocumentTypeFilter documentTypeFilter)
        {
            return _userRepository.GetDocumentTypes(documentTypeFilter);
        }

         /// <summary>
        /// Metodo para obtener la lista de roles
        /// </summary>
        /// /// <param name="roleFilter"></param>
        /// <returns></returns>
        public List<Role> GetRoles(RoleFilter roleFilter)
        {
            return _userRepository.GetRoles(roleFilter);
        }

        /// <summary>
        /// Metodo para guardar y editar los roles por usuarios
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long PostRoleUser(User user, long idUser)
        {
            if (user == null)
                throw new ArgumentsNullException();

            var result = _userRepository.PostRoleUser(user, idUser);
            return result;
        }

        /// <summary>
        /// Metodo para cambiar la contrasena del usuario
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long PostNewPassword(User user, long idUser)
        {
            if (user == null)
                throw new ArgumentsNullException();

            var passwordValue = _passwordConfiguration.GeneratePassword(user);
            user.Password = _passwordConfiguration.EncryptPassword(passwordValue);
            var result = _userRepository.PostNewPassword(user, idUser);
            return result;
        }

        /// <summary>
        /// Metodo para cambiar la contrasena del usuario desde el perfil
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long PostNewPasswordUser(UserNewPassword user, long idUser)
        {
            if (user == null)
                throw new ArgumentsNullException();

            user.NewPassword = _passwordConfiguration.EncryptPassword(user.NewPassword);
            user.AcctualityPassword = _passwordConfiguration.EncryptPassword(user.AcctualityPassword);
            var result = _userRepository.PostNewPasswordUser(user, idUser);
            return result;
        }
    }
}
