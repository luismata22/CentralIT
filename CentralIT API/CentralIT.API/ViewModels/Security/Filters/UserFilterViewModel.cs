using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CentralIT.API.ViewModels.Security.Filters {
    public class UserFilterViewModel {
        public long UserId { get; set; }

        public int EntityTypeId { get; set; }

        public int DepartmentId { get; set; } 
        
        public int PositionId { get; set; }

        public string IdentityCard { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        public int Status { get; set; }
    }
}
