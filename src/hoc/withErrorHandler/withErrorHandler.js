import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import axios1 from '../../axios-orders';

const withErrorHandler = (WrappedContent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount () {
            axios1.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            axios1.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            });
        }
        errorConfirmedHandler =() => {
            this.setState({error:null})
        }
        render () {
            return (
                <Aux>
                    <Modal show={this.state.error}
                    clicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedContent {...this.props} />
                </Aux> 
            )
        }
    }
}

export default withErrorHandler;