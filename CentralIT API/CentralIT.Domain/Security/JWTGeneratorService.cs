using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace CentralIT.Domain.Security {
    public class JWTGeneratorService : IJWTGenerator {

        private readonly ILogger<JWTGeneratorService> _logger;

        public IConfiguration AppSettings { get; }

        public JWTGeneratorService(IConfiguration appSettings, ILogger<JWTGeneratorService> logger)
        {
            AppSettings = appSettings;
            _logger = logger;
        }

        public virtual string CreateTokenJWT(long usuarioId)
        {
            _logger.LogDebug("CreateTokenJWT called", null);
            var tokenHandler = new JwtSecurityTokenHandler();
            var userid = Convert.ToInt32(usuarioId);
            var tokenDescriptor = CreateSecurityDescriptor(userid);
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private SecurityTokenDescriptor CreateSecurityDescriptor(int usuarioId)
        {
            var key = Encoding.ASCII.GetBytes(AppSettings["JWT:Key"]);
            return new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", usuarioId.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
        }
    }
}
