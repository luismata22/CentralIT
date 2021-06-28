using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;

namespace CentralIT.API.ViewModels.Security {
    public class ProfileViewModel {

        public string Image { get; set; }

        public string FileName { get; set; }
        //public IFormFile sliderFile { get; set; }
    }
}
