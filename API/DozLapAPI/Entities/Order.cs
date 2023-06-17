using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Order
{
    public long Id { get; set; }

    public string? Note { get; set; }

    public DateTime? CreatedOnUtc { get; set; }

    public long? CustomerId { get; set; }

    public long? ShippingAddressId { get; set; }

    public long? ShippingMethodId { get; set; }

    public long? PaymentMethodId { get; set; }

    public decimal? TotalPrice { get; set; }

    public string? Status { get; set; }

    public bool? IsPaid { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual PaymentMethod? PaymentMethod { get; set; }

    public virtual Address? ShippingAddress { get; set; }

    public virtual ShipmentMethod? ShippingMethod { get; set; }
}
