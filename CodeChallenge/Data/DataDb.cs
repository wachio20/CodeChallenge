using CodeChallenge.Models;
using System.Collections.Generic;

namespace CodeChallenge.Data
{
    public static class DataDb
    {
        public static Coins CoinsDB = new Coins() 
        {
            Cents = 100,
            Nickels = 10,
            Dimes = 5,
            Quarters = 25
        };

        public static List<Drink> DrinksDB = new List<Drink>()
        {
            new Drink()
            {
                Price = 0.25, 
                Type = "Coke",
                Quantity = 5
            },
            new Drink()
            {
                Price = 0.36,
                Type = "Pepsi",
                 Quantity = 15
            },
            new Drink()
            {
                Price = 0.45,
                Type = "Soda",
                Quantity = 3
            }
        };
    }
}
