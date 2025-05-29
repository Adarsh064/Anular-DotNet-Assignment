namespace ObservationAPI.Models
{
    public class Observation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DataEntry> Datas { get; set; }
    }
}
