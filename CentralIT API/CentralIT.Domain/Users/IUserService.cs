using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Users.Roles;

namespace CentralIT.Domain.Users {
    public interface IUserService {

        List<User> GetUsers(UserFilter userFilter);

        long PostUser(User user, long idUser);

        List<DocumentType> GetDocumentTypes(DocumentTypeFilter documentTypeFilter);

        List<Role> GetRoles(RoleFilter roleFilter);

        long PostRoleUser(User user, long idUser);

        long PostNewPassword(User user, long idUser);

        long PostNewPasswordUser(UserNewPassword user, long idUser);
    }
}
