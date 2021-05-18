using LilyCms.BLL.Interfaces;
using LilyCms.DomainObjects.Pages;
using LilyCms.DomainObjects.Sites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Route("pages/{siteUrl}")]
        public async Task<ActionResult<IEnumerable<PageDto>>> GetPages(string siteUrl)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(siteUrl))
                {
                    return BadRequest("Url is not valid");
                }
                var pages = await _pageService.GetPagesAsync(siteUrl);

                if (pages == null)
                {
                    return NotFound(new { message = $"There is no site with such url: {siteUrl}" });
                }

                return Ok(pages);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to retrieve pages for site with url {siteUrl}: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("pages/{siteUrl}/{pageUrl}")]
        public async Task<ActionResult<PageDetailsDto>> GetUserPageDetails([Required] string siteUrl, [Required] string pageUrl)
        {
            try
            {
                var page = await _pageService.GetPageDetailsAsync(siteUrl, pageUrl, isUserView: true);

                if (page == null)
                {
                    return NotFound();
                }

                return Ok(page);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to retrieve page with site url {siteUrl} and page url {pageUrl}: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }
    }
}
