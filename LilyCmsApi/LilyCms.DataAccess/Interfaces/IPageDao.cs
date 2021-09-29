using LilyCms.DomainObjects.Pages;
using LilyCms.DomainObjects.RelatedPageInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Interfaces
{
    public interface IPageDao
    {
        Task<IEnumerable<PageDto>> GetPagesAsync(string siteUrl);
        Task<PageDto> AddOrUpdatePageAsync(PageDto pageDto);
        Task DeletePageAsync(Guid pageId);
        Task<bool> IsPageUrlFreeAsync(string pageUrl, Guid siteId);
        Task<PageDetailsDto> GetPageDetailsAsync(string siteUrl, string pageUrl, bool isUserView);
        Task<PageDetailsDto> SavePageContentAsync(PageDetailsDto pageDetailsDto);
        Task<PageDto> GetPageByFeedbackIdAsync(Guid pageFeedbackId);
        Task<IEnumerable<PageFeedbackDto>> GetPageFeedbacksAsync(Guid pageId);
        Task<PageFeedbackDto> AddOrUpdatePageFeedbackAsync(PageFeedbackDto pageFeedbackDto);
        Task DeletePageFeedbackAsync(Guid pageFeedbackId);
    }
}
