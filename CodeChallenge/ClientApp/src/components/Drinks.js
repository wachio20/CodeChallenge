import React, { useState, useEffect } from 'react';
import { InputNumber, Button, MessageBox } from 'element-react';
import { getAvailableDrinks, updateAvailableDrinks, processPurchase } from '../services/DrinksMachineService';
import { disableGetDrinks, getTotalAmount } from '../Helpers/DrinksMachineHelper'
import { Row, Col, Modal} from 'react-bootstrap';

const Drinks = () => {
    const [total, setTotal] = useState(0)
    const [coke, setCoke] = useState({})
    const [pepsi, setPepsi] = useState({})
    const [soda, setSoda] = useState({})
    const [drinks, setDrinks] = useState({
        coke: {type: 'coke', quantity: 0},
        pepsi: {type: 'pepsi', quantity: 0},
        soda: {type: 'soda', quantity: 0},
    })
    const [coins, setCoins] = useState({
        cents: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
    })

    async function getDrinks() {
        let response = await getAvailableDrinks()
        setCoke({...response.data.find(d=>d.type === 'Coke')})
        setPepsi({...response.data.find(d=>d.type === 'Pepsi')})
        setSoda({...response.data.find(d=>d.type === 'Soda')})
    }

    useEffect(() => {
        getDrinks()
    }, [])

    const onGetDrinksClicked = async () => {
        let data = []
        data.push(drinks.coke)
        data.push(drinks.pepsi)
        data.push(drinks.soda)
        let purchase = await processPurchase(coins, total)
        if(purchase.status === 400){
            MessageBox.alert(purchase.data, 'Error')
            return
        }
        let response = await updateAvailableDrinks(data)
        if(response.status === 400){
            MessageBox.alert(response.data, 'Error')
            return
        }else{
            await getDrinks()
            resetAll()
            MessageBox.alert(<div style={{marginLeft: '30px'}}><strong><Row>Order Total: ${total}</Row>
            <Row>You Paid with: ${getTotalAmount(coins)}</Row>
            <Row>Your change is: </Row>
            <div style={{marginLeft: '20px'}}>
            <Row>{purchase.data.cents} Cents,</Row>
            <Row>{purchase.data.nickels} Nickels,</Row>
            <Row>{purchase.data.dimes} Dimes,</Row> 
            <Row>and {purchase.data.quarters} Quarters</Row></div>
            <Row>For a total change of: ${getTotalAmount(purchase.data)}</Row></strong></div>, 'Order Summary')
        }
    }

    const resetAll = () => {
        let resetedDrinks = {
            coke: {type: 'coke', quantity: 0},
            pepsi: {type: 'pepsi', quantity: 0},
            soda: {type: 'soda', quantity: 0},
        }
        let resetCoins = {
            cents: 0,
            nickels: 0,
            dimes: 0,
            quarters: 0,
            }
        setDrinks({...resetedDrinks})
        setCoins({...resetCoins})
        setTotal(0)
    }

    const onDrinkChange = (type, quantity) =>{
        let orderTotal = 0
        let updated = {
            coke: {type: 'coke', quantity: drinks.coke.quantity},
            pepsi: {type: 'pepsi', quantity: drinks.pepsi.quantity},
            soda: {type: 'soda', quantity: drinks.soda.quantity},
        }

        if(type === 'coke')
            updated.coke.quantity = quantity
        else if (type==='pepsi')
            updated.pepsi.quantity = quantity
        else if (type==='soda')
            updated.soda.quantity = quantity

        setDrinks(updated)

        orderTotal += updated.coke.quantity > 0 ? (updated.coke.quantity * coke.price) : 0
        orderTotal += updated.pepsi.quantity > 0 ? (updated.pepsi.quantity * pepsi.price) : 0
        orderTotal += updated.soda.quantity > 0 ? (updated.soda.quantity * soda.price) : 0
        setTotal(orderTotal)
    }

    const onCoinsChange = (type, quantity) =>{
        let updated = {
            cents: coins.cents,
            nickels: coins.nickels,
            dimes: coins.dimes,
            quarters: coins.quarters,
        }

        if(type === 'cents')
            updated.cents = quantity
        else if (type==='nickels')
            updated.nickels = quantity
        else if (type==='dimes')
            updated.dimes = quantity
        else if (type==='quarters')
            updated.quarters = quantity    

        setCoins(updated)
    }


  return (
    <div style={{marginTop: '20px'}} className='container'>
        <h3>COINS INFORMATION</h3>
        <div style={{marginTop: '20px'}} class="row">
            <div class="col-sm">
                <Row><strong>Cents</strong></Row>
                <Row><InputNumber defaultValue={coins.cents} onChange={onCoinsChange.bind(this, 'cents')} min="0" value={coins.cents}></InputNumber></Row>
            </div>
            <div class="col-sm">
                <Row><strong>Nickels</strong></Row>
                <Row><InputNumber defaultValue={coins.nickels} onChange={onCoinsChange.bind(this, 'nickels')} min="0" value={coins.nickels}></InputNumber></Row>
            </div>
            <div class="col-sm">
                <Row><strong>Dimes</strong></Row>
                <Row><InputNumber defaultValue={coins.dimes} onChange={onCoinsChange.bind(this, 'dimes')} min="0" value={coins.dimes}></InputNumber></Row>
            </div>
            <div class="col-sm">
                <Row><strong>Quarters</strong></Row>
                <Row><InputNumber defaultValue={coins.quarters} onChange={onCoinsChange.bind(this, 'quarters')} min="0" value={coins.quarters}></InputNumber></Row>
            </div>
        </div>
        <h3 style={{marginTop: '50px'}}>PRODUCTS INFORMATION</h3>
        <div style={{marginTop: '20px'}} class="row">
            <div class="col-md-6">
                <div style={{marginTop: '10px'}} class="row">
                    <div class="col-sm">
                        <div class="row">
                            <strong>Coke</strong>
                        </div>
                        <div style={{fontSize: '12px'}} class="row">
                            {coke.quantity===0 ? <div>Sold Out</div> : <div>{coke.quantity} drinks available, Cost={coke.price} each</div>} 
                        </div>
                    </div>
                    <div class="col-sm">
                        <InputNumber defaultValue={drinks.coke.quantity} onChange={onDrinkChange.bind(this, 'coke')} min="0" max={coke.quantity} value={drinks.coke.quantity} disabled={coke.quantity===0}></InputNumber>
                    </div>
                </div>
                <div style={{marginTop: '10px'}} class="row">
                    <div class="col-sm">
                        <div class="row">
                            <strong>Pepsi</strong>
                        </div>
                        <div style={{fontSize: '12px'}} class="row">
                            {pepsi.quantity===0 ? <div>Sold Out</div> : <div>{pepsi.quantity} drinks available, Cost={pepsi.price} each</div>} 
                        </div>
                    </div>
                    <div class="col-sm">
                        <InputNumber defaultValue={drinks.pepsi.quantity} onChange={onDrinkChange.bind(this, 'pepsi')} min="0" max={pepsi.quantity} value={drinks.pepsi.quantity} disabled={pepsi.quantity===0}></InputNumber>
                    </div>
                </div>
                <div style={{marginTop: '10px'}} class="row">
                    <div class="col-sm">
                        <div class="row">
                            <strong>Soda</strong>
                        </div>
                        <div style={{fontSize: '12px'}} class="row">
                            {soda.quantity===0 ? <div>Sold Out</div> : <div>{soda.quantity} drinks available, Cost={soda.price} each</div>}
                        </div>
                    </div>
                    <div class="col-sm">
                        <InputNumber defaultValue={drinks.soda.quantity} onChange={onDrinkChange.bind(this, 'soda')} min="0" max={soda.quantity} value={drinks.soda.quantity} disabled={soda.quantity===0}></InputNumber>
                    </div> 
                </div>
            </div>
            <div class="col-md-6">
                <div class="row"/>
                <div class="row">
                    <h3>ORDER TOTAL: ${total}</h3>
                </div>
                <div style={{marginTop: '30px'}} class="row">
                    <Button onClick={onGetDrinksClicked} disabled={disableGetDrinks(coins, drinks)}>GET DRINKS</Button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Drinks;
