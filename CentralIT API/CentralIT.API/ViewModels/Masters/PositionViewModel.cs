using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CentralIT.API.ViewModels.Masters {
    public class PositionViewModel {

        public int IdPositionDepartment { get; set; }

        public int IdPosition { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }
    }
}
