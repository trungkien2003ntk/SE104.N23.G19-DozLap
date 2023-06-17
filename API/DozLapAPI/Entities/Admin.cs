using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Admin
{
    public long Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }
}
