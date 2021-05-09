using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Models
{
    public class PageArea : IBaseEntity
    {
        public Guid Id { get; set; }
        public string Title { get ; set ; }
        public string Description { get ; set ; }
        public bool Enabled { get ; set ; }
        public string Content { get; set; }
        public Enums.ContentType ContentType { get; set; }

        public DateTimeOffset CreatedAt { get ; set ; }
        public DateTimeOffset? ModifiedAt { get ; set ; }
        public Guid PageId { get; set; }

        public Page Page { get; set; }
        public ContentType ContentTypeRelation { get; set; }
    }
}
