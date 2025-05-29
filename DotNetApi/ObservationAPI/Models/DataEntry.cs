namespace ObservationAPI.Models
{
    public class DataEntry
    {
        public string SamplingTime { get; set; }
        public List<Property> Properties { get; set; }
    }
}
