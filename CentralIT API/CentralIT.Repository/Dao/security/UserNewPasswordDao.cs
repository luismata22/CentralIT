using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.security {
    public class UserNewPasswordDao {
        [JsonProperty("ActualClaveAcceso")]
        public string AcctualityPassword { get; set; }
        [JsonProperty("NuevaClaveAcceso")]
        public string NewPassword { get; set; }
    }
}
