using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Common;
using CentralIT.Domain.Department;
using CentralIT.Domain.Position;
using CentralIT.Domain.Service;
using CentralIT.Domain.Users;

namespace CentralIT.Domain.Request {
    public class RequestGet {
        public int RequestId { get; set; }

        public string NameUserRequested { get; set; }

        public int UserAttendedId { get; set; }

        public string NameUserAttended { get; set; }

        public User UserRequested { get; set; }
        
        public User UserAttended { get; set; }

        public string NameUserRequestedInitial { get; set; }

        public string PhoneUserRequestedInitial { get; set; }

        public Status RequestStatus { get; set; }

        public RequestType RequestType { get; set; }

        public Priority Priority { get; set; }

        public Services Service { get; set; }

        public Departments Department { get; set; }

        public Positions Position { get; set; }

        public string Reason { get; set; }

        public string Observation { get; set; }

        public bool Status { get; set; }

        public DateTime RequestDate { get; set; }

        public DateTime AttendedDate { get; set; }

        public DateTime FinishDate { get; set; }

    }
}
