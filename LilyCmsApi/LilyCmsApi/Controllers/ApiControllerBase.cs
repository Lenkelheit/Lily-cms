using LilyCms.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LilyCmsApi.Controllers
{
    [Authorize]
    [ApiController]
    public class ApiControllerBase : ControllerBase
    {
        protected readonly ISecurityService _securityService;

        public ApiControllerBase(ISecurityService securityService)
        {
            _securityService = securityService;
        }

        protected string GetUserEmail()
        {
            return User.FindFirstValue(ClaimTypes.Email);
        }
    }
}
