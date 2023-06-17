using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class ProductCategory
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<DiscountAppliedCategory> DiscountAppliedCategories { get; set; } = new List<DiscountAppliedCategory>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
