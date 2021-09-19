using LilyCms.DomainObjects.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResult> AuthenticateGoogleAsync(AuthRequest authRequest);
    }
}
