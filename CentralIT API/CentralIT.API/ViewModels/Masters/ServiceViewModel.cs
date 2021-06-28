using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CentralIT.API.ViewModels.Masters {
    public class ServiceViewModel {

        public int IdService { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<DepartmentViewModel> Department { get; set; }

        public bool Status { get; set; }
    }
}
