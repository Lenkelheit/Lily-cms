using LilyCms.BLL.Interfaces;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DomainObjects.Pages;
using LilyCms.DomainObjects.Sites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Services
{
    public class PageService : IPageService
    {
        private readonly IPageDao _pageDao;

        public PageService(IPageDao pageDao)
        {
            _pageDao = pageDao;
        }

        public async Task<IEnumerable<PageDto>> GetPagesAsync(string siteUrl)
        {
            return await _pageDao.GetPagesAsync(siteUrl);
        }

        public async Task<PageDto> AddOrUpdatePageAsync(PageDto pageDto)
        {
            return await _pageDao.AddOrUpdatePageAsync(pageDto);
        }

        public async Task DeletePageAsync(Guid pageId)
        {
            await _pageDao.DeletePageAsync(pageId);
        }

        public async Task<bool> IsPageUrlFreeAsync(string pageUrl, Guid siteId)
        {
            return await _pageDao.IsPageUrlFreeAsync(pageUrl, siteId);
        }

        public async Task<PageDetailsDto> GetPageDetailsAsync(string siteUrl, string pageUrl)
        {
            return await _pageDao.GetPageDetailsAsync(siteUrl, pageUrl);
        }

        public async Task<PageDetailsDto> SavePageContentAsync(PageDetailsDto pageDetailsDto)
        {
            return await _pageDao.SavePageContentAsync(pageDetailsDto);
        }
    }
}
