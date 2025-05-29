using ObservationAPI.Models;
using ObservationAPI.Services.Interface;
using System.Text.Json;

namespace ObservationAPI.Services.Data
{
    public class ObservationService:IObservationService
    {
        private readonly string _filePath=Path.Combine(Directory.GetCurrentDirectory(), "Data", "data.json");
        public async Task<List<Observation>> GetObservations()
        {
            if (!File.Exists(_filePath))
            {
                return new List<Observation>();
            }
            var json = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<Observation>>(json)!;
        }
        public async Task<Observation> SaveObservationAsync(Observation observation)
        {
            List<Observation> observations = new();

            if (File.Exists(_filePath))
            {
                var existingJson = await File.ReadAllTextAsync(_filePath);
                if (!string.IsNullOrWhiteSpace(existingJson))
                {
                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    observations = JsonSerializer.Deserialize<List<Observation>>(existingJson, options)
                                   ?? new List<Observation>();
                }
            }

            // Optionally set a new ID
            observation.Id = observations.Count > 0 ? observations.Max(o => o.Id) + 1 : 1;

            observations.Add(observation);

            var newJson = JsonSerializer.Serialize(observations, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_filePath, newJson);

            return observation;
        }

    }
}
