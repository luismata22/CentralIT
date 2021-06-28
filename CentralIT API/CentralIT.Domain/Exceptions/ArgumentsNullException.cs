using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Exceptions {
    public class ArgumentsNullException : ArgumentException {
        public ArgumentsNullException()
           : base("Ocurrio un error al crear el usuario, faltan datos por cargar.")
        {
        }
    }
}
