using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Permissions {
    public interface IPermissionRepository {

        List<Permission> GetPermissionByUser(int idUser);
    }
}
