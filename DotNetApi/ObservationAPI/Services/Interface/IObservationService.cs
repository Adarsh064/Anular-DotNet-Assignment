using ObservationAPI.Models;

namespace ObservationAPI.Services.Interface
{
    public interface IObservationService
    {
        Task<List<Observation>> GetObservations();
        Task<Observation> SaveObservationAsync(Observation observation);
    }
}
