using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Security;

namespace CentralIT.API.ViewModels.Request {
    public class RequestGetViewModel {

        public int RequestId { get; set; }

        public string NameUserRequested { get; set; }

        public int UserAttendedId { get; set; }

        public string NameUserAttended { get; set; }

        public UserViewModel UserRequested { get; set; }

        public UserViewModel UserAttended { get; set; }

        public string NameUserRequestedInitial { get; set; }

        public string PhoneUserRequestedInitial { get; set; }

        public StatusViewModel RequestStatus { get; set; }

        public RequestTypeViewModel RequestType { get; set; }

        public PriorityViewModel Priority { get; set; }

        public ServiceViewModel Service { get; set; }

        public DepartmentViewModel Department { get; set; }

        public PositionViewModel Position { get; set; }

        public string Reason { get; set; }

        public string Observation { get; set; }

        public bool Status { get; set; }

        public DateTime RequestDate { get; set; }

        public DateTime AttendedDate { get; set; }

        public DateTime FinishDate { get; set; }
    }
}
