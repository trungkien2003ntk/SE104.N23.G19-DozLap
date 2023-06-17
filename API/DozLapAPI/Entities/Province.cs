using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Province
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public decimal? ShippingCharge { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();
}
