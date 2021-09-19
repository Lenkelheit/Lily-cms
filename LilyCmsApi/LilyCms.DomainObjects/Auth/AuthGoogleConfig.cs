using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.Auth
{
    public class AuthGoogleConfig
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string JwtSecretKey { get; set; }
    }
}
