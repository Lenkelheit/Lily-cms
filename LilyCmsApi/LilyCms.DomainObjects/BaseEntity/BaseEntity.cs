﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.BaseEntity
{
    public class BaseEntity : IBaseEntity
    {
        public Guid Id { get; set; }
        [Required]
        [StringLength(256)]
        public string Title { get; set; }
        [StringLength(512)]
        public string Description { get; set; }
        public bool Enabled { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? ModifiedAt { get; set; }
    }
}
