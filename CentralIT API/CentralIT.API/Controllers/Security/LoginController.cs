using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Security;
using CentralIT.Domain.Login;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CentralIT.API.Controllers.Security {

    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase {

        private readonly ILoginService _loginRepository;
        private readonly IMapper _autoMapper;
        private readonly ILogger<LoginController> _logger;

        public LoginController(
            ILoginService loginRepository,
            IMapper autoMapper,
            ILogger<LoginController> logger)
        {
            _loginRepository = loginRepository;
            _autoMapper = autoMapper;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public ActionResult<string> Authenticate(LoginViewModel viewModel)
        {
            _logger.LogDebug("Test logging", null);
            var credentials = _autoMapper.Map<Login>(viewModel);
            var authenticateResponse = _loginRepository.LoginUser(credentials);
            return new JsonResult(authenticateResponse);
        }

        [AllowAnonymous]
        [HttpPost("RefreshToken")]
        public ActionResult<string> RefreshToken(string refreshToken)
        {
            _logger.LogDebug("Test logging", null);
            var authenticateResponse = _loginRepository.RefreshTokenJTW(refreshToken);

            if (authenticateResponse == null)
                return NotFound(new { error = new { message = "Su sesión ha expirado." } });

            return new JsonResult(authenticateResponse);
        }
    }
}
