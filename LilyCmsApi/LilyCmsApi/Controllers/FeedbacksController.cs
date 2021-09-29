using LilyCms.BLL.Interfaces;
using LilyCms.DomainObjects.Pages;
using LilyCms.DomainObjects.RelatedPageInfo;
using Microsoft.AspNetCore.Authorization;
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
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbacksController : ApiControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbacksController(ISecurityService securityService, IFeedbackService feedbackService) : base(securityService)
        {
            _feedbackService = feedbackService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PageDto>> AddOrUpdatePageFeedback(PageFeedbackDto pageFeedbackDto)
        {
            try
            {
                return Ok(await _feedbackService.AddOrUpdatePageFeedbackAsync(pageFeedbackDto));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to add or update page feedback: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }

        [HttpDelete]
        [Route("{pageFeedbackId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeletePageFeedback(Guid pageFeedbackId)
        {
            try
            {
                await _feedbackService.DeletePageFeedbackAsync(pageFeedbackId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Error occurred attempting to delete page feedback: {ex.InnerException?.Message ?? ex.Message}" });
            }
        }

    }
}
