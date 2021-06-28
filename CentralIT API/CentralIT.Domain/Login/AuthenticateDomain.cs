using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Users;

namespace CentralIT.Domain.Login {
    public class AuthenticateDomain {

        public AuthenticateResponse GenerateAuthenticateResponse(User user, string token)
        {
            var response = new AuthenticateResponse
            {
                Id = user.UserId,
                Name = user.FirstName,
                LastName = user.FirstLastName,
                Email = user.Email,
                Token = token,
                RefreshToken = user.RefreshToken
            };

            return response;
        }
    }
}
