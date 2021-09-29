using LilyCms.DomainObjects.RelatedPageInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Interfaces
{
    public interface IFeedbackService
    {
        Task<IEnumerable<PageFeedbackDto>> GetPageFeedbacksAsync(Guid pageId);
        Task<PageFeedbackDto> AddOrUpdatePageFeedbackAsync(PageFeedbackDto pageFeedbackDto);
        Task DeletePageFeedbackAsync(Guid pageFeedbackId);
    }
}
