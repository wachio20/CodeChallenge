using System;
using System.Collections.Generic;
using System.Linq;
using CodeChallenge.Models;

namespace CodeChallenge.Helpers
{
    public static class DispenserHelper
    {
        public static bool ValidateDrinks(List<Drink> availableDrinks, List<Drink> purchasedDrinks)
        {
            int availableQuantity = 0;
            bool notZero = false;
            foreach (Drink drink in purchasedDrinks)
            {
                if (drink.Quantity > 0) notZero = true;
                availableQuantity = availableDrinks.FirstOrDefault(d => d.Type.ToLower().Equals(drink.Type.ToLower()))
                    .Quantity;
                if ((availableQuantity - drink.Quantity) < 0)
                    return false;
            }

            return notZero;
        }

        public static bool ValidateCoins(Coins coins, double total)
        {
            double amountEntered = coins.Cents*0.01 + coins.Dimes*0.1 + coins.Nickels*0.05 + coins.Quarters*0.25;
            if (amountEntered >= total)
                return true;
            return false;
        }

        public static Coins ValidateAndGetChange(Coins availableCoins, double total, Coins coins)
        {
            double amountEntered = coins.Cents * 0.01 + coins.Dimes * 0.1 + coins.Nickels * 0.05 + coins.Quarters * 0.25;
            double change = SubsDouble(amountEntered, total);
            if (change == 0) return new Coins(){ Cents = 0, Dimes = 0, Nickels = 0, Quarters = 0};

            return CalculateChange(change, availableCoins);
        }

        private static double SubsDouble(double num1, double num2)
        {
            return Math.Round((num1 - num2), 2);
        }

        private static Coins GetCopy(Coins coins)
        {
            return new Coins()
            {
                Cents = coins.Cents,
                Dimes = coins.Dimes,
                Nickels = coins.Nickels,
                Quarters = coins.Quarters
            };
        }

        private static Coins CalculateChange(double returnAmount, Coins coins)
        {
            Coins change = new Coins() { Cents = 0, Dimes = 0, Nickels = 0, Quarters = 0 };
            Coins availableCoins = GetCopy(coins);
            while (returnAmount > 0 && (availableCoins.Quarters > 0 || availableCoins.Dimes > 0 || availableCoins.Nickels > 0 || availableCoins.Cents > 0))
            {
                if (availableCoins.Quarters > 0 && ((returnAmount - 0.25) >= 0))
                {
                    returnAmount = SubsDouble(returnAmount, 0.25);
                    availableCoins.Quarters--;
                    change.Quarters++;

                }
                else if (availableCoins.Dimes > 0 && ((returnAmount - 0.1) >= 0))
                {
                    returnAmount = SubsDouble(returnAmount, 0.1);
                    availableCoins.Dimes--;
                    change.Dimes++;
                }
                else if (availableCoins.Nickels > 0 && ((returnAmount - 0.05) >= 0))
                {
                    returnAmount = SubsDouble(returnAmount, 0.05);
                    availableCoins.Nickels--;
                    change.Nickels++;
                }
                else if (availableCoins.Cents > 0 && ((returnAmount - 0.01) >= 0))
                {
                    returnAmount = SubsDouble(returnAmount, 0.01);
                    availableCoins.Cents--;
                    change.Cents++;
                }
            }

            if (returnAmount > 0 || returnAmount < 0) return null;

            return change;
        }
    }
}
