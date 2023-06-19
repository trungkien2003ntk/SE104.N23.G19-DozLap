using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Customer
{
    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("username")]
    public string? Username { get; set; }

    [JsonProperty("password")]
    public string? Password { get; set; }

    [JsonProperty("email")]
    public string? Email { get; set; }

    [JsonProperty("first_name")]
    public string? FirstName { get; set; }

    [JsonProperty("last_name")]
    public string? LastName { get; set; }

    [JsonProperty("gender")]
    public string? Gender { get; set; }

    [JsonProperty("phone_number")]
    public string? PhoneNumber { get; set; }

    [JsonProperty("date_of_birth")]
    public DateTime? DateOfBirth { get; set; }

    [JsonProperty("address_id")]
    public long? AddressId { get; set; }

    [JsonProperty("address")]
    public virtual Address? Address { get; set; }

    [JsonProperty("orders")]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    [JsonProperty("shopping_cart_items")]
    public virtual ICollection<ShoppingCartItem> ShoppingCartItems { get; set; } = new List<ShoppingCartItem>();
}