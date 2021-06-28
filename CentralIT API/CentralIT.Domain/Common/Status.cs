using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Common {
    public class Status {

         public int IdStatus { get; set; }

        public int IdStatusType { get; set; }

        public string Name { get; set; }

        public bool IndActivo { get; set; }
    }
}
