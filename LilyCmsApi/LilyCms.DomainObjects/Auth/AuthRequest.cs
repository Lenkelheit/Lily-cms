using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.Auth
{
    public class AuthRequest
    {
        [Required]
        public string Provider { get; set; }
        [Required]
        public string IdToken { get; set; }
    }
}
