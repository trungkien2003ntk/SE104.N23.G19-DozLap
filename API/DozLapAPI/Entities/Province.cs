using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Province
{
    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("name")]
    public string? Name { get; set; }

    [JsonProperty("shipping_charge")]
    public decimal? ShippingCharge { get; set; }

    [JsonProperty("addresses")]
    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();
}

