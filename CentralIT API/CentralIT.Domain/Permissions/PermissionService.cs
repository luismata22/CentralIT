using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.Extensions.Logging;

namespace CentralIT.Domain.Permissions {
    public class PermissionService : IPermissionService {

        private readonly IPermissionRepository _repository;
        private readonly ILogger<PermissionService> _logger;

        public PermissionService(IPermissionRepository repository, ILogger<PermissionService> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        public List<Permission> GetPermissionByUser(int idUser)
        {
            _logger.LogDebug("Get permission by user");
            return _repository.GetPermissionByUser(idUser);
        }
    }
}
