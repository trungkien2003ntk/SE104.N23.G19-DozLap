using Newtonsoft.Json;

namespace DozLapAPI.Models
{
    public class ProductDTO
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("image_url")]
        public string? ImageUrl { get; set; }

        [JsonProperty("description")]
        public string? Description { get; set; }

        [JsonProperty("specs")]
        public string? Specs { get; set; }

        [JsonProperty("price")]
        public decimal? Price { get; set; }

        [JsonProperty("status")]
        public bool? Status { get; set; }

        [JsonProperty("category_id")]
        public long? CategoryId { get; set; }
    }
}
