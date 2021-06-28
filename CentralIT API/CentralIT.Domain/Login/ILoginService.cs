using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Login {
    public interface ILoginService {

        AuthenticateResponse LoginUser(Login credentials);

        string RefreshTokenJTW(string refreshToken);
    }
}
