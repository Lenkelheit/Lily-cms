using LilyCms.BLL.Interfaces;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DomainObjects.Sites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Services
{
    public class SiteService : ISiteService
    {
        private readonly ISiteDao _siteDao;

        public SiteService(ISiteDao siteDao)
        {
            _siteDao = siteDao;
        }

        public async Task<IEnumerable<SiteDto>> GetSitesAsync()
        {
            return await _siteDao.GetSitesAsync();
        }

        public async Task<SiteDto> AddOrUpdateSiteAsync(SiteDto siteDto)
        {
            return await _siteDao.AddOrUpdateSiteAsync(siteDto);
        }

        public async Task DeleteSiteAsync(Guid siteId)
        {
            await _siteDao.DeleteSiteAsync(siteId);
        }

        public async Task<SiteDetailsDto> GetSiteDetailsAsync(string siteUrl)
        {
            return await _siteDao.GetSiteDetailsAsync(siteUrl);
        }

        public async Task<bool> IsSiteUrlFreeAsync(string siteUrl)
        {
            return await _siteDao.IsSiteUrlFreeAsync(siteUrl);
        }

    }
}
