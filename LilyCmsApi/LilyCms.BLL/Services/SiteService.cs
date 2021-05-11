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

        public async Task<SiteDto> AddSiteAsync(SiteDto siteDto)
        {
            return await _siteDao.AddSiteAsync(siteDto);
        }

        
    }
}
