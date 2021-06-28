﻿using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Repository.Dao.common {
    public class DatabaseResult {
        public long IdResponseCode { get; set; }

        public string ResponseCode { get; set; }

        public long EntityId { get; set; }

        public string Table { get; set; }

        public string Message { get; set; }

        public enum ResponseCodes
        {
            /// <summary>
            /// Operacion exitosa
            /// </summary>
            Success = 0,

            /// <summary>
            /// Error general de base de datos
            /// </summary>
            GeneralError = 1000,

            /// <summary>
            /// Nombre de la entidad duplicada
            /// </summary>
            DuplicatedName = 1001,

            /// <summary>
            /// Registro no existe
            /// </summary>
            RecordDoesNotExist = 1002,

            /// <sumary>
            /// Abreviatura de entidad duplicada
            /// </sumary>
            DuplicatedAbbreviation = 1004,
            /// <sumary>
            /// El objeto se inactiva cuando tiene otros objetos asociados
            /// </sumary>
            Compromise = 1006,
            /// <sumary>
            /// Categoria con productos asociados
            /// </sumary>
            ProductsInCategories = 1031,
           /// <sumary>
           /// Clasificación con productos asociados
           /// </sumary>
            ProductsInClassification = 1033,
           
            PasswordEqual = 1021
        }
    }
}
