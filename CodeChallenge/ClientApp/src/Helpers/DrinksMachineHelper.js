export const disableGetDrinks = (coins, drinks) => {
    if(!validateDrinks(drinks))
        return true;
    if (!validateCoins(coins))
        return true

    return false
}

export const validateDrinks = (drinks) =>{
    if(drinks.coke.quantity === 0 && drinks.pepsi.quantity === 0 && drinks.soda.quantity === 0)
        return false;

    return true
}

export const validateCoins = (coins) =>{
    if (coins.cents === 0 && coins.nickels === 0 && coins.dimes === 0 && coins.quarters === 0)
        return false
    
    return true
}

export const getTotalAmount = (coins) =>{
    return coins.cents * 0.01 + coins.dimes * 0.1 + coins.nickels * 0.05 + coins.quarters * 0.25
}

