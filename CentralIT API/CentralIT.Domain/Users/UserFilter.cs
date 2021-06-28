using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Users {
    public class UserFilter {

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
