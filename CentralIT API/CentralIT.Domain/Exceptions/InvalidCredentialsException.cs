using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Exceptions {
    public class InvalidCredentialsException : ArgumentException {
        public InvalidCredentialsException()
           : base("Credenciales inválidas")
        {
        }
    }
}
