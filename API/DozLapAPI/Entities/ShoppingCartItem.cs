using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class ShoppingCartItem
{
    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("customer_id")]
    public long? CustomerId { get; set; }

    [JsonProperty("product_id")]
    public long? ProductId { get; set; }

    [JsonProperty("quantity")]
    public long? Quantity { get; set; }

    [JsonProperty("created_on_utc")]
    public DateTime? CreatedOnUtc { get; set; }

    [JsonProperty("customer")]
    public virtual Customer? Customer { get; set; }

    [JsonProperty("product")]
    public virtual Product? Product { get; set; }
}