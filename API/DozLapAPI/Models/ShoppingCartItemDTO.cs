using Newtonsoft.Json;

namespace DozLapAPI.Models
{
    public class ShoppingCartItemDTO
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("customer_id")]
        public long? CustomerId { get; set; }

        [JsonProperty("product_id")]
        public long? ProductId { get; set; }

        [JsonProperty("quantity")]
        public long? Quantity { get; set; }

        [JsonProperty("created_on_utc")]
        public DateTime? CreatedOnUtc { get; set; }
    }
}
