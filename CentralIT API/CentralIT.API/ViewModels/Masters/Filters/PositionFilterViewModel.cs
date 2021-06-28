using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CentralIT.API.ViewModels.Masters.Filters {
    public class PositionFilterViewModel {

        public int IdPosition { get; set; }

        public int IdDepartment { get; set; }

        public string Position { get; set; }

        public int Status { get; set; }
    }
}
