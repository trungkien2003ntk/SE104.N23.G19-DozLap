using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class DiscountAppliedCategory
{
    public long Id { get; set; }

    public long? DiscountId { get; set; }

    public long? CategoryId { get; set; }

    public virtual ProductCategory? Category { get; set; }

    public virtual Discount? Discount { get; set; }
}
