﻿using System;
using System.Collections.Generic;

namespace DozLapAPI.Models;

public partial class CreditCardType
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public decimal? Charge { get; set; }
}
