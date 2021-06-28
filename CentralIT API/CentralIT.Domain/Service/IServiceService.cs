using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Service {
    public interface IServiceService {

        List<Services> GetServices(ServiceFilter serviceFilter);

        long PostService(Services service, long idUser);
    }
}
