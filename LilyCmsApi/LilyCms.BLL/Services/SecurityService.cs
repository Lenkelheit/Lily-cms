using LilyCms.BLL.Interfaces;
using LilyCms.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly ISiteDao _siteDao;

        public SecurityService(ISiteDao siteDao)
        {
            _siteDao = siteDao;
        }

        public async Task<bool> HasUserAccessToSite(Guid siteId, string userEmail)
        {
            return await _siteDao.HasUserAccessToSite(siteId, userEmail);
        }

        public async Task<bool> HasUserAccessToSite(string siteUrl, string userEmail)
        {
            return await _siteDao.HasUserAccessToSite(siteUrl, userEmail);
        }

        public async Task<bool> HasUserAccessToPage(Guid pageId, string userEmail)
        {
            return await _siteDao.HasUserAccessToPage(pageId, userEmail);
        }

    }
}
