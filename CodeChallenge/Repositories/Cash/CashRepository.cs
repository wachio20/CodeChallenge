using CodeChallenge.Data;
using CodeChallenge.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeChallenge.Repositories.Cash
{
    public class CashRepository : ICashRepository
    {
        public Coins GetAvailableCoins()
        {
            return DataDb.CoinsDB;
        }

        public void UpdateCoins(Coins consumedCoins)
        {
            DataDb.CoinsDB.Dimes -= consumedCoins.Dimes;
            DataDb.CoinsDB.Cents -= consumedCoins.Cents;
            DataDb.CoinsDB.Nickels -= consumedCoins.Nickels;
            DataDb.CoinsDB.Quarters -= consumedCoins.Quarters;
        }
        
    }
}
