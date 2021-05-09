using LilyCms.DomainObjects.BaseEntity;
using LilyCms.DomainObjects.Pages;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.Sites
{
    public class SiteDetailsDto : BaseEntity.BaseEntity, ISearchable
    {
        public string UrlSlug { get; set; }

        public ICollection<PageDetailsDto> Pages { get; set; } = new List<PageDetailsDto>();
    }
}
