using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Security;
using CentralIT.Domain.Permissions;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CentralIT.API.Controllers.Security {
    [Route("[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase {

        private readonly IPermissionService _permissionService;
        private readonly IMapper _autoMapper;
        private readonly ILogger<PermissionController> _logger;

        public PermissionController(
            IPermissionService permissionService,
            IMapper autoMapper,
            ILogger<PermissionController> logger)
        {
            _permissionService = permissionService;
            _autoMapper = autoMapper;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("GetPermissionsByUser")]
        [ProducesResponseType(typeof(List<PermissionViewModel>), (int)HttpStatusCode.OK)]
        public ActionResult GetPermissionsByUser(int idUser)
        {
            _logger.LogDebug("Test logging", null);
            var permission = _permissionService.GetPermissionByUser(idUser);
            var viewModel = _autoMapper.Map<List<PermissionViewModel>>(permission);
            return new JsonResult(viewModel);
        }
    }
}
