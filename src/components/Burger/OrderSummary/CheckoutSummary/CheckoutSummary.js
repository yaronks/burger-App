import React from 'react';
import Burger from '../../Burger';
import Button from '../../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = ( props ) => {
    return (
        <div className='CheckoutSummary'>
            <h1>We hope it tastes good</h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button 
                    btnType='Danger'
                    clicked={props.checkoutCancelled}
                >CANCEL
                </Button>
                <Button 
                    btnType='Success'
                    clicked={props.checkoutContinued}
                >CONTINUE
                </Button>
            </div>
        </div>
    )
}

export default checkoutSummary;