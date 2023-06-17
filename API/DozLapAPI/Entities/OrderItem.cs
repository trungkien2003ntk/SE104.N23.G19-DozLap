using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class OrderItem
{
    public long Id { get; set; }

    public long? OrderId { get; set; }

    public long? ProductId { get; set; }

    public long? Quantity { get; set; }

    public short? Rate { get; set; }

    public string? Comment { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Product? Product { get; set; }
}
