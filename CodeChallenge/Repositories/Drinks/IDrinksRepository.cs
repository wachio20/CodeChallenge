using CodeChallenge.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeChallenge.Repositories.Drinks
{
    public interface IDrinksRepository
    {
        List<Drink> GetAvailableDrinks();
        void UpdateDrinks(List<Drink> consumedDrinks);
    }
}
