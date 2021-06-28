using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CentralIT.API.ViewModels.Masters {
    public class StatusViewModel {

        public int IdStatus { get; set; }

        public int IdStatusType { get; set; }

        public string Name { get; set; }

        public bool IndActivo { get; set; }
    }
}
