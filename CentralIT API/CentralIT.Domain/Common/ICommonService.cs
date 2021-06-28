using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Common {
    public interface ICommonService {

        List<Status> GetStatues(StatusFilter statusFilter);

        List<Priority> GetPriorities(PriorityFilter priorityFilter);

        List<RequestType> GetRequestTypes(RequestTypeFilter requestTypeFilter);
    }
}
