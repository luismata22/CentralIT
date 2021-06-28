using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CentralIT.API.ViewModels.Masters {
    public class DocumentTypeViewModel {

        public int IdDocumentType { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public bool Status { get; set; }
    }
}
