using Newtonsoft.Json;

namespace DozLapAPI.Models
{
    public class AddressDTO
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("house_number")]
        public string? HouseNumber { get; set; }

        [JsonProperty("street")]
        public string? Street { get; set; }

        [JsonProperty("province_id")]
        public long? ProvinceId { get; set; }

    }
}
