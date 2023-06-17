using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class ShoppingCartItem
{
    public long Id { get; set; }

    public long? CustomerId { get; set; }

    public long? ProductId { get; set; }

    public long? Quantity { get; set; }

    public DateTime? CreatedOnUtc { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Product? Product { get; set; }
}
