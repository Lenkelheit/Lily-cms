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
    [Route("api/[controller]")]
    public class PagesController : ControllerBase
    {
        private readonly IPageService _pageService;

        public PagesController(IPageService pageService)
        {
            _pageService = pageService;
        }

        // test build 1
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PageDto>> AddOrUpdatePage(PageDto pageDto)
        {
            try
            {
                return Ok(await _pageService.AddOrUpdatePageAsync(pageDto));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to add or update page: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }

        [HttpDelete]
        [Route("{pageId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeletePage(Guid pageId)
        {
            try
            {
                await _pageService.DeletePageAsync(pageId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to delete page: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("isUrlFree")]
        public async Task<ActionResult<bool>> IsPageUrlFree(string pageUrl, Guid siteId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(pageUrl))
                {
                    return BadRequest("Url is not valid");
                }

                return Ok(await _pageService.IsPageUrlFreeAsync(pageUrl, siteId));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to check if page url {pageUrl} is free: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("{siteUrl}/{pageUrl}")]
        public async Task<ActionResult<PageDetailsDto>> GetPageDetails([Required] string siteUrl, [Required] string pageUrl)
        {
            try
            {
                var page = await _pageService.GetPageDetailsAsync(siteUrl, pageUrl, isUserView: false);

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

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("pageContent")]
        public async Task<ActionResult<PageDetailsDto>> SavePageContent(PageDetailsDto pageDetailsDto)
        {
            try
            {
                return Ok(await _pageService.SavePageContentAsync(pageDetailsDto));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to save page content: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }
    }
}
