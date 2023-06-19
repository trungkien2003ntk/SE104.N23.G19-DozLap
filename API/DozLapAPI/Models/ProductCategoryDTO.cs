using Newtonsoft.Json;

namespace DozLapAPI.Models
{
    public class ProductCategoryDTO
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("description")]
        public string? Description { get; set; }

    }
}
