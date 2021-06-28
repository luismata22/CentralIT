using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Users;

namespace CentralIT.Domain.Login {
    public interface ILoginRepository {

        User UserLogin(string userName, string password);

        int RefreshToken(string refreshToken);
    }
}
