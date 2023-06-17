using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Product
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? ImageUrl { get; set; }

    public string? Description { get; set; }

    public string? Specs { get; set; }

    public decimal? Price { get; set; }

    public bool? Status { get; set; }

    public long? CategoryId { get; set; }

    public virtual ProductCategory? Category { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<ShoppingCartItem> ShoppingCartItems { get; set; } = new List<ShoppingCartItem>();
}
