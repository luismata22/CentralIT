using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Security {
    public interface IJWTGenerator {

        string CreateTokenJWT(long userId);
    }
}
