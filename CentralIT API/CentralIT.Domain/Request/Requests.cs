using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Common;
using CentralIT.Domain.Service;
using CentralIT.Domain.Users;

namespace CentralIT.Domain.Requests {
    public class Requests {

        public int RequestId { get; set; }

        public User UserRequestedId { get; set; }

        public User UserAttendedId { get; set; }

        public Status RequestStatus { get; set; }

        public RequestType RequestType { get; set; }

        public Priority Prioriry { get; set; }

        public Services Service { get; set; }

        public string Reason { get; set; }

        public string Observation { get; set; }

        public bool Status { get; set; }

        public DateTime RequestDate { get; set; }

        public DateTime AttendedDate { get; set; }
    }
}
