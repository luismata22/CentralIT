using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Exceptions;
using CentralIT.Domain.Security;

using Microsoft.Extensions.Logging;

namespace CentralIT.Domain.Login {
    public class LoginService : ILoginService {

        private readonly ILoginRepository _loginRepository;
        private readonly ILogger<LoginService> _logger;
        private readonly IPasswordConfiguration _passwordConfiguration;
        private readonly IJWTGenerator _jwtGenerator;
        public LoginService(ILogger<LoginService> logger, IPasswordConfiguration passwordConfiguration, ILoginRepository loginRepository, IJWTGenerator jwtGenerator)
        {
            _loginRepository = loginRepository;
            _logger = logger;
            _passwordConfiguration = passwordConfiguration;
            _jwtGenerator = jwtGenerator;
        }
        public AuthenticateResponse LoginUser(Login credentials)
        {
            _logger.LogDebug("LoginUser called", null);
            if (string.IsNullOrEmpty(credentials.Email) || string.IsNullOrEmpty(credentials.Password))
                throw new InvalidCredentialsException();

            var encryptPassword = _passwordConfiguration.EncryptPassword(credentials.Password);
            var user = _loginRepository.UserLogin(credentials.Email, encryptPassword);

            if (user is null) {
                return null;
            }

            var token = _jwtGenerator.CreateTokenJWT(user.UserId);
            var authenticateDomain = new AuthenticateDomain();
            return authenticateDomain.GenerateAuthenticateResponse(user, token);
        }

        public string RefreshTokenJTW(string refreshToken)
        {
            _logger.LogDebug("RefreshTokenJTW called", null);
            var userId = _loginRepository.RefreshToken(refreshToken);

            if (userId == 0)
                return null;

            return _jwtGenerator.CreateTokenJWT(userId);
        }
    }
}
