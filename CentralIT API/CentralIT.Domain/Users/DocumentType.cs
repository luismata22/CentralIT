using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Users {
    public class DocumentType {

        public int IdDocumentType { get; set; }

        public string Name { get; set; }

        public string Identifier { get; set; }

        public bool Status { get; set; }
    }
}
