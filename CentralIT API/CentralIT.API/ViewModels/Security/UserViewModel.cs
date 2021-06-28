using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CentralIT.API.ViewModels.Masters;

namespace CentralIT.API.ViewModels.Security {
    public class UserViewModel {

        public long UserId { get; set; }

        public int EntityTypeId { get; set; }

        public int DepartmentId { get; set; } 
        
        public int PositionDepartmentId { get; set; }

        public string IdentityCard { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string FirstLastName { get; set; }

        public string SecondLastName { get; set; }

        public string MainPhone { get; set; }

        public string secondaryPhone { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public RoleViewModel Roles { get; set; }

        public DepartmentViewModel Departments { get; set; }

        public PositionViewModel Positions { get; set; }

        public bool Status { get; set; }
    }
}
