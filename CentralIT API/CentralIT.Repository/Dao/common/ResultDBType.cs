using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Repository.Dao.common {
    public enum ResultDBType
    {
        /// <summary>
        /// <value>Error en resultado de consulta</valie>
        /// </summary>
        Error = -1,

        /// <summary>
        /// <value>Resultado de consulta éxitoso</valie>
        /// </summary>
        Exists = -2
    }
}
