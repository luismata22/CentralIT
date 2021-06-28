using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Request;

namespace CentralIT.Domain.Requests {
    public interface IRequestService {

        List<RequestGet> GetRequests(RequestFilter requestFilter);

        long PostRequest(Requests request, long idUser);

        List<RequestGet> GetReportsRequests(ReportRequestFilter reportrequestFilter);
    }
}
