using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Interfaces
{
    public interface ISecurityService
    {
        Task<bool> HasUserAccessToSite(Guid siteId, string userEmail);
        Task<bool> HasUserAccessToSite(string siteUrl, string userEmail);
        Task<bool> HasUserAccessToPage(Guid pageId, string userEmail);
    }
}
