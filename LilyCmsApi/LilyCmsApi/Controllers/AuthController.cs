using Google.Apis.Auth;
using LilyCms.BLL.Interfaces;
using LilyCms.DomainObjects.Auth;
using LilyCms.DomainObjects.Sites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LilyCmsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthResult>> Authenticate(AuthRequest authRequest)
        {
            try
            {
                return Ok(await _authService.AuthenticateGoogleAsync(authRequest));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to authenticate user: {JsonConvert.SerializeObject(authRequest)}, Error: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }
    }
}
