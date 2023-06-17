using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class CreditCard
{
    public long Id { get; set; }

    public long? CardTypeId { get; set; }

    public string? Username { get; set; }

    public string? CsvNumber { get; set; }

    public decimal? Balance { get; set; }

    public DateTime? ExpireOnUtc { get; set; }

    public string? AccountNumber { get; set; }

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();
}
