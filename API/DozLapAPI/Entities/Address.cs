using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Address
{
    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("house_number")]
    public string? HouseNumber { get; set; }

    [JsonProperty("street")]
    public string? Street { get; set; }

    [JsonProperty("province_id")]
    public long? ProvinceId { get; set; }

    [JsonProperty("customers")]
    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    [JsonProperty("orders")]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    [JsonProperty("province")]
    public virtual Province? Province { get; set; }
}

