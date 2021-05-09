using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.BaseEntity
{
    public interface ISearchable
    {
        [Required]
        [StringLength(64)]
        public string UrlSlug { get; set; }
    }
}
