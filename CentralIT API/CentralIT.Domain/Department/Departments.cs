using System;
using System.Collections.Generic;

using CentralIT.Domain.Position;

namespace CentralIT.Domain.Department {
    public class Departments {

        public int IdDepartment { get; set; }

        public int IdServiceDepartment { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<Positions> Positions { get; set; }

        public bool Status { get; set; }
    }
}
