using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Customer
{
    public long Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Gender { get; set; }

    public string? PhoneNumber { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public long? CardId { get; set; }

    public virtual CreditCard? Card { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<ShoppingCartItem> ShoppingCartItems { get; set; } = new List<ShoppingCartItem>();
}
