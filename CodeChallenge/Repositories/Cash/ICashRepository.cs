using CodeChallenge.Models;

namespace CodeChallenge.Repositories.Cash
{
    public interface ICashRepository
    {
        Coins GetAvailableCoins();
        void UpdateCoins(Coins consumedCoins);
    }
}
