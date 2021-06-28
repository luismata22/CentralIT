using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Permissions {
    public interface IPermissionService {

        List<Permission> GetPermissionByUser(int idUser);
    }
}
