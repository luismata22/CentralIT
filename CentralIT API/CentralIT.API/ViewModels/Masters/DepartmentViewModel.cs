using System.Collections.Generic;

namespace CentralIT.API.ViewModels.Masters {
    public class DepartmentViewModel {

        public int IdDepartment { get; set; }

        public int IdServiceDepartment { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<PositionViewModel> Positions { get; set; }

        public bool Status { get; set; }
    }
}
