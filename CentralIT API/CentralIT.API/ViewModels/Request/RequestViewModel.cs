using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Security;

namespace CentralIT.API.ViewModels.Request {
    public class RequestViewModel {
        public int RequestId { get; set; }

        public UserViewModel UserRequestedId { get; set; }

        public UserViewModel UserAttendedId { get; set; }

        public StatusViewModel RequestStatus { get; set; }

        public RequestTypeViewModel RequestType { get; set; }

        public PriorityViewModel Prioriry { get; set; }

        public ServiceViewModel Service { get; set; }

        public string Reason { get; set; }

        public string Observation { get; set; }

        public bool Status { get; set; }

        public DateTime RequestDate { get; set; }

        public DateTime AttendedDate { get; set; }
    }
}
