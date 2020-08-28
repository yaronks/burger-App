import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }

    OrderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
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
    render () {
        return (
            <div>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input type ="text" name="name" placeholder="Your Name"/>
                    <input type ="text" name="email" placeholder="Your Email"/>
                    <input type ="text" name="street" placeholder="Street"/>
                    <input type ="text" name="postalCode" placeholder="PostalCode"/>
                    <Button btnType="Success" clicked={this.OrderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}
export default ContactData;