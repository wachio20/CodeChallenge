using CodeChallenge.Data;
using CodeChallenge.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeChallenge.Repositories.Drinks
{
    public class DrinksRepository : IDrinksRepository
    {
        public List<Drink> GetAvailableDrinks()
        {
            return DataDb.DrinksDB;
        }

        public void UpdateDrinks(List<Drink> consumedDrinks)
        {
            foreach(Drink drink in consumedDrinks)
            {
                DataDb.DrinksDB.FirstOrDefault(d => d.Type.ToLower().Equals(drink.Type.ToLower())).Quantity -= drink.Quantity;
            }
        }
    }
}
