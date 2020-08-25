import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from './../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredSummary = Object.keys(props.ingredients)
    .map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
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
            <p>Price: <strong>${props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </Aux>
        
    );
};

export default orderSummary;