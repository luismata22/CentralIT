using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Service {
    public interface IServiceRepository {

        List<Services> GetServices(ServiceFilter serviceFilter);

        long PostService(Services service, long idUser);
    }
}
