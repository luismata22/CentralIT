using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Login {
    public class AuthenticateResponse {
        public long Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

        public Guid RefreshToken { get; set; }
    }
}
