using System;
using System.Collections.Generic;

namespace DozLapAPI.Entities;

public partial class BuildVersion
{
    public byte Clo { get; set; }

    public string DatabaseVersion { get; set; } = null!;

    public DateTime VersionDate { get; set; }

    public DateTime ModifiedDate { get; set; }
}
