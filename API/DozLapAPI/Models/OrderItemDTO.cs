using Newtonsoft.Json;

namespace DozLapAPI.Models
{
    public class OrderItemDTO
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("order_id")]
        public long? OrderId { get; set; }

        [JsonProperty("product_id")]
        public long? ProductId { get; set; }

        [JsonProperty("quantity")]
        public long? Quantity { get; set; }

        [JsonProperty("rate")]
        public short? Rate { get; set; }

        [JsonProperty("comment")]
        public string? Comment { get; set; }

    }
}
