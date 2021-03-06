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
        ingredients: null,
        totalPrice: 4,
        purchased: false,
        purchasable: false,
        loading: false,
    }

    componentDidMount  () {
        axios.get('https://yaron-burger.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients:response.data})
        }) 
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
        const query = [];
        for (let i in this.state.ingredients) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        query.push("price=" + this.state.totalPrice);
        const queryString = query.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
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
                    {!this.state.loading && this.state.ingredients ? 
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancelled={this.purchaseCancelled}
                        continued = {this.completePurchase}
                        price={this.state.totalPrice.toFixed(2)}
                    /> : <Spinner />}
                </Modal>
                {this.state.ingredients ?
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        addIngred={this.addIngredientHandler} 
                        deleteIngred={this.deleteIngredientHandler}
                        purchasable={this.state.purchasable}
                        ordered={this.updatePurchased}
                        price={this.state.totalPrice}
                    />
                </Aux> : <Spinner/>
                    }
                
            </Aux>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios);