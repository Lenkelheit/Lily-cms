using LilyCms.DomainObjects.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Models
{
    public class Site : IBaseEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string UrlSlug { get; set; }
        public bool Enabled { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? ModifiedAt { get; set; }
        public Guid UserId { get; set; }

        public User User { get; set; }
        public ICollection<Page> Pages { get; set; } = new List<Page>();
    }
}
