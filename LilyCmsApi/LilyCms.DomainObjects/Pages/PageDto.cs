using LilyCms.DomainObjects.BaseEntity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.Pages
{
    public class PageDto : BaseEntity.BaseEntity, ISearchable
    {
        public string UrlSlug { get; set; }
        public Guid SiteId { get; set; }
    }
}
