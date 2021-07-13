using System;
using System.Collections.Generic;
using System.Linq;
using CodeChallenge.Helpers;
using CodeChallenge.Models;
using CodeChallenge.Repositories.Cash;
using CodeChallenge.Repositories.Drinks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CodeChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DispenserController : ControllerBase
    {

        private readonly ILogger<DispenserController> _logger;
        private readonly ICashRepository _cashRepository;
        private readonly IDrinksRepository _drinksRepository;

        public DispenserController(ILogger<DispenserController> logger,
            ICashRepository cashRepository,
            IDrinksRepository drinksRepository)
        {
            _logger = logger;
            _cashRepository = cashRepository;
            _drinksRepository = drinksRepository;
        }

        [HttpGet("GetAvailableDrinks")]
        public IActionResult GetAvailableDrinks()
        {
            try
            {
                var drinks = _drinksRepository.GetAvailableDrinks();
                if (drinks == null || drinks.Count() == 0)
                {
                    return NoContent();
                };
                return Ok(drinks);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("UpdateAvailableDrinks")]
        public IActionResult UpdateAvailableDrinks([FromBody] IEnumerable<Drink> drinks)
        {
            try
            {
                var availableDrinks = _drinksRepository.GetAvailableDrinks();
                if (DispenserHelper.ValidateDrinks(availableDrinks, drinks.ToList()))
                {
                    _drinksRepository.UpdateDrinks(drinks.ToList());
                    return Ok();
                } else
                {
                    return BadRequest("Drink is sold out, your purchase cannot be processed");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

        [HttpPost("ProcessPurchase/{total}")]
        public IActionResult ProcessPurchase([FromBody] Coins coins, double total)
        {
            try
            {
                if (DispenserHelper.ValidateCoins(coins, total))
                {
                    var availableCoins = _cashRepository.GetAvailableCoins();
                    Coins change = DispenserHelper.ValidateAndGetChange(availableCoins, total, coins);
                    if (change != null)
                    {
                        _cashRepository.UpdateCoins(change);
                        return Ok(change);
                    }
                    else
                    {
                        return BadRequest("Not sufficient change in the inventory");
                    }
                }
                else
                {
                    return BadRequest("The amount entered is less than the total of the order");
                }

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
