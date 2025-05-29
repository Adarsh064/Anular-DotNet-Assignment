using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ObservationAPI.Models;
using ObservationAPI.Services.Interface;

namespace ObservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObservationController : ControllerBase
    {
        private readonly IObservationService _observationService;
        public ObservationController(IObservationService observationService)
        {
            _observationService = observationService;   
        }
        [HttpGet]
        public async Task<IActionResult> GetObservations()
        {
            var data = await _observationService.GetObservations();
            if (data == null)
                return NotFound("Observation data not found.");
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> SaveObservations(Observation observations)
        {
            var data = await _observationService.SaveObservationAsync(observations);
            return Ok(data);
        }

    }
}
