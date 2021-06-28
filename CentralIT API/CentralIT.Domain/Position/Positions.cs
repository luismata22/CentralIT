using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Position {
    public class Positions {

        public int IdPositionDepartment { get; set; }

        public int IdPosition { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }
    }
}
