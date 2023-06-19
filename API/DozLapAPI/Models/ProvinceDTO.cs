using Newtonsoft.Json;

namespace DozLapAPI.Models
{
    public class ProvinceDTO
    {

        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("shipping_charge")]
        public decimal? ShippingCharge { get; set; }
    }
}
