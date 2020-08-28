import React,{ Component } from 'react';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients: {
            lettuce: 1,
            tomato: 1,
            cheese: 1,
            meat: 1
        }
    }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search); 
    //     const ingredients = {};
    //     for (let param in query.entries()){
    //         ingredients[param[0]] = +param[1]
    //     }
    //     this.setState({ingredients:ingredients})
    // }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>  
            </div>
        );
    }
}

export default Checkout;