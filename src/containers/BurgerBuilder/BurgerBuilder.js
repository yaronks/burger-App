import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    lettuce: 0.5,
    tomato: 0.4,
    cheese: 1.3,
    meat: 0.7,
}

class BurgerBuilder extends Component{     
    state = {
        ingredients: {
            lettuce: 0,
            tomato: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchased: false,
        purchasable: false,
        loading: false,
    }

    updatePurchased = () => {
        this.setState({
            purchased: true
        })
    };

    updatePurchaseState () {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey]
        })
        .reduce( (sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0})
    };

    purchaseCancelled = () => {
        this.setState({purchased:false});
    }

    completePurchase = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Yaron Sternberg',
                address: {
                    street: '3111 Avenue J',
                    zipcode: '11210',
                    country: 'US',
                },
            email: 'yaronks@stanford.edu'
            },
        delieveryMethod: 'car'  
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchased:false})
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false, purchased:false})
        });
    }

    addIngredientHandler = (type) => {
        console.log('working');
        const old = this.state.ingredients[type];
        const updated = old + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        } 
        updatedIngredients[type] = updated;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        console.log(this.state.totalPrice);
        this.updatePurchaseState();
    }

    deleteIngredientHandler = (type) => {
        const old = this.state.ingredients[type];
        if (old !== 0){
            const updated = old - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            } 
            updatedIngredients[type] = updated;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients:updatedIngredients,
                totalPrice: newPrice
            })
            console.log(this.state.totalPrice);
            this.updatePurchaseState();
        }
        return;
    }

    render () {
        return (
            <Aux>
                <Modal show={this.state.purchased} modalClosed={this.purchaseCancelled}>
                    {!this.state.loading ? 
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancelled={this.purchaseCancelled}
                        continued = {this.completePurchase}
                        price={this.state.totalPrice.toFixed(2)}
                    /> : <Spinner />}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngred={this.addIngredientHandler} 
                    deleteIngred={this.deleteIngredientHandler}
                    purchasable={this.state.purchasable}
                    ordered={this.updatePurchased}
                    price={this.state.totalPrice}
                />
                
            </Aux>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios);