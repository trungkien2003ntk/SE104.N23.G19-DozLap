using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Product
{
    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("name")]
    public string? Name { get; set; }

    [JsonProperty("image_url")]
    public string? ImageUrl { get; set; }

    [JsonProperty("description")]
    public string? Description { get; set; }

    [JsonProperty("specs")]
    public string? Specs { get; set; }

    [JsonProperty("price")]
    public decimal? Price { get; set; }

    [JsonProperty("status")]
    public bool? Status { get; set; }

    [JsonProperty("category_id")]
    public long? CategoryId { get; set; }

    [JsonProperty("category")]
    public virtual ProductCategory? Category { get; set; }

    [JsonProperty("order_items")]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    [JsonProperty("shopping_cart_items")]
    public virtual ICollection<ShoppingCartItem> ShoppingCartItems { get; set; } = new List<ShoppingCartItem>();
}