//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AGENDAPP.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class MSP_PRESTACION
    {
        public int ID_PRESTACION { get; set; }
        public string CODIGO { get; set; }
        public string NOMBRE_PREVISION { get; set; }
        public string DESCRIPCION { get; set; }
        public Nullable<int> PRECIO_PARTICULAR { get; set; }
        public Nullable<int> COD_IMPUESTO { get; set; }
        public Nullable<bool> ESTADO { get; set; }
        public Nullable<int> COD_ORGANIZACION { get; set; }
    }
}