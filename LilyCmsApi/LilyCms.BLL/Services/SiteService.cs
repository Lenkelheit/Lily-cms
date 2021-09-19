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
        private readonly IUserDao _userDao;

        public SiteService(ISiteDao siteDao, IUserDao userDao)
        {
            _siteDao = siteDao;
            _userDao = userDao;
        }

        public async Task<IEnumerable<SiteDto>> GetSitesAsync(string userEmail)
        {
            return await _siteDao.GetSitesAsync(userEmail);
        }

        public async Task<SiteDto> AddOrUpdateSiteAsync(SiteDto siteDto, string userEmail)
        {
            var user = await _userDao.GetUserAsync(userEmail);
            return await _siteDao.AddOrUpdateSiteAsync(siteDto, user.Id);
        }

        public async Task DeleteSiteAsync(Guid siteId)
        {
            await _siteDao.DeleteSiteAsync(siteId);
        }

        public async Task<SiteDetailsDto> GetSiteDetailsAsync(string siteUrl, bool isUserView)
        {
            return await _siteDao.GetSiteDetailsAsync(siteUrl, isUserView);
        }

        public async Task<bool> IsSiteUrlFreeAsync(string siteUrl)
        {
            return await _siteDao.IsSiteUrlFreeAsync(siteUrl);
        }

    }
}
