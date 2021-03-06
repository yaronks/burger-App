import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Tomato', type: 'tomato' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = ( props ) => ( 
    <div className="BuildControls">
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.addIngred(ctrl.type)}
                deleted={() => props.deleteIngred(ctrl.type)}
            />
        ))}
        <button 
            onClick={props.ordered}
            className="OrderButton"
        >
            ORDER NOW
            </button>
    </div>
);

export default buildControls;