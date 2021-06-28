using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Users;

namespace CentralIT.Domain.Requests {
    public class RequestFilter {

        public int RequestId { get; set; }

        public int UserRequestedId { get; set; }

        public int UserAttendedId { get; set; }

        public int RequestTypeId { get; set; }

        public int PriorityId { get; set; }

        public int ServiceId { get; set; }

        public int DepartmentId { get; set; }

        public int Status { get; set; }

        public DateTime RequestDate { get; set; }

        public DateTime AttendedDate { get; set; }
    }
}
