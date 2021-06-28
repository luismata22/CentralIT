using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Department;
using CentralIT.Domain.Position;
using CentralIT.Domain.Users.Roles;

using Newtonsoft.Json;

namespace CentralIT.Domain.Users {
    public class User {

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

        public Role Roles { get; set; }

        public Departments Departments { get; set; }

        public Positions Positions { get; set; }


        public bool Status { get; set; }

        public Guid RefreshToken { get; set; }
    }
}
