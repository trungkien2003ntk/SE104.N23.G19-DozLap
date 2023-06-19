using Newtonsoft.Json;

namespace DozLapAPI.Models
{
    public class CustomerDTO
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("username")]
        public string? Username { get; set; }

        [JsonProperty("password")]
        public string? Password { get; set; }

        [JsonProperty("email")]
        public string? Email { get; set; }

        [JsonProperty("first_name")]
        public string? FirstName { get; set; }

        [JsonProperty("last_name")]
        public string? LastName { get; set; }

        [JsonProperty("gender")]
        public string? Gender { get; set; }

        [JsonProperty("phone_number")]
        public string? PhoneNumber { get; set; }

        [JsonProperty("date_of_birth")]
        public DateTime? DateOfBirth { get; set; }

        [JsonProperty("address_id")]
        public long? AddressId { get; set; }
    }
}
