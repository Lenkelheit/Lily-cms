using LilyCms.BLL.Interfaces;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DomainObjects.RelatedPageInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IPageDao _pageDao;

        public FeedbackService(IPageDao pageDao)
        {
            _pageDao = pageDao;
        }

        public async Task<IEnumerable<PageFeedbackDto>> GetPageFeedbacksAsync(Guid pageId)
        {
            return await _pageDao.GetPageFeedbacksAsync(pageId);
        }

        public async Task<PageFeedbackDto> AddOrUpdatePageFeedbackAsync(PageFeedbackDto pageFeedbackDto)
        {
            return await _pageDao.AddOrUpdatePageFeedbackAsync(pageFeedbackDto);
        }

        public async Task DeletePageFeedbackAsync(Guid pageFeedbackId)
        {
            await _pageDao.DeletePageFeedbackAsync(pageFeedbackId);
        }

        
    }
}
