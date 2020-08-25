import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate () {
        console.log("[Updated Order Summary]");
    }
    
    render () {
        const ingredSummary = Object.keys(this.props.ingredients)
    .map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        )
    });
        return (
            <Aux>
                <h3>Your Orders:</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredSummary}
                </ul>
                <p>Price: <strong>${this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continued}>CONTINUE</Button>
            </Aux>
        ); 
    }
};

export default OrderSummary;