using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Discount
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public int? DiscountPercentage { get; set; }

    public DateTime? StartDateUtc { get; set; }

    public DateTime? EndDateUtc { get; set; }

    public virtual ICollection<DiscountAppliedCategory> DiscountAppliedCategories { get; set; } = new List<DiscountAppliedCategory>();
}
