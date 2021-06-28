using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Users;

namespace CentralIT.Domain.Security {
    public interface IPasswordConfiguration {

        string GeneratePassword(User userInfo);

        string EncryptPassword(string password);

        string RandomOTP(int length);
    }
}
