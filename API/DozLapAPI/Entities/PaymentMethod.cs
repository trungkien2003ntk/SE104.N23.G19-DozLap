using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class PaymentMethod
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
