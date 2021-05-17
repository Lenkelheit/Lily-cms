using LilyCms.BLL.Interfaces;
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
    [Route("api/core")]
    public class SitePageCoreController : ControllerBase
    {
        private readonly ISiteService _siteService;
        private readonly IPageService _pageService;

        public SitePageCoreController(ISiteService siteService, IPageService pageService)
        {
            _siteService = siteService;
            _pageService = pageService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("sites/{siteUrl}")]
        public async Task<ActionResult<SiteDetailsDto>> GetUserSiteDetails(string siteUrl)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(siteUrl))
                {
                    return BadRequest("Url is not valid");
                }
                var site = await _siteService.GetSiteDetailsAsync(siteUrl, isUserView: true);

                if (site == null)
                {
                    return NotFound();
                }

                return Ok(site);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to retrieve site with url {siteUrl}: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }
    }
}
