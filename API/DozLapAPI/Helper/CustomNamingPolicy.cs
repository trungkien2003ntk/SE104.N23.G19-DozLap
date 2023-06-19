using System.Text.Json;
using System.Text;

namespace DozLapAPI.Helper
{
    public class CustomNamingPolicy : JsonNamingPolicy
    {
        public override string ConvertName(string name)
        {
            // Convert the name to underscore format
            return ConvertToUnderscore(name);
        }

        private string ConvertToUnderscore(string name)
        {
            var sb = new StringBuilder();
            bool previousCharIsUpper = false;

            foreach (char c in name)
            {
                if (Char.IsUpper(c))
                {
                    if (sb.Length > 0 && !previousCharIsUpper)
                    {
                        sb.Append('_');
                    }
                    sb.Append(Char.ToLower(c));
                    previousCharIsUpper = true;
                }
                else
                {
                    sb.Append(c);
                    previousCharIsUpper = false;
                }
            }

            return sb.ToString();
        }
    }
}
