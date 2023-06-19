using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Order
{
    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("note")]
    public string? Note { get; set; }

    [JsonProperty("created_on_utc")]
    public DateTime? CreatedOnUtc { get; set; }

    [JsonProperty("customer_id")]
    public long? CustomerId { get; set; }

    [JsonProperty("shipping_address_id")]
    public long? ShippingAddressId { get; set; }

    [JsonProperty("total_price")]
    public decimal? TotalPrice { get; set; }

    [JsonProperty("status")]
    public string? Status { get; set; }

    [JsonProperty("is_paid")]
    public bool? IsPaid { get; set; }

    [JsonProperty("customer")]
    public virtual Customer? Customer { get; set; }

    [JsonProperty("order_items")]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    [JsonProperty("shipping_address")]
    public virtual Address? ShippingAddress { get; set; }
}
