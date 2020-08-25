import React from 'react';
import Aux from '../../hoc/Aux';
import '../Layout/Layout.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ( props ) => (
    <Aux>
        <div>
            <Toolbar/>
            <SideDrawer/>
        </div>
        <main className="Content">
            {props.children}
        </main> 
    </Aux>
);

export default layout;