import React from 'react';
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >ORDERS</NavigationItem>
    </ul>
);
export default navigationItems;