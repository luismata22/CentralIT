using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Utils {
    public static class JsonUtils {
        public static T DeserializeObjectOrDefault<T>(string json, T defaultValue)
        {
            if (json == null)
                json = "";

            T result = JsonConvert.DeserializeObject<T>(json);
            return result != null ? result : defaultValue;
        }
    }
}
