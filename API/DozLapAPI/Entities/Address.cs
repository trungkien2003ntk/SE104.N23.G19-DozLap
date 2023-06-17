using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Address
{
    public long Id { get; set; }

    public string? HouseNumber { get; set; }

    public string? Street { get; set; }

    public long? ProvinceId { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Province? Province { get; set; }
}
