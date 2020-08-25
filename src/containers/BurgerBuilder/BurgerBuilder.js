import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7,
}

class BurgerBuilder extends Component{     
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchased: false,
        purchasable: false,
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
        alert('You continue!');
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
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancelled={this.purchaseCancelled}
                        continued = {this.completePurchase}
                        price={this.state.totalPrice.toFixed(2)}
                    />
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
export default BurgerBuilder;