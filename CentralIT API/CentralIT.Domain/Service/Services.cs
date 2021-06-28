using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Department;

namespace CentralIT.Domain.Service {
    public class Services {

        public int IdService { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<Departments> Department { get; set; }

        public bool Status { get; set; }
    }
}
