using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class Admin
{
    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("username")]
    public string? Username { get; set; }

    [JsonProperty("password")]
    public string? Password { get; set; }
}