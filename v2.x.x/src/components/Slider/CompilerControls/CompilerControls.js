import React from 'react';
import classes from './CompilerControls.css';
import CompilerControl from './CompilerControl/CompilerControl';

const controls = [
	{label: 'Lettuce', type: 'lettuce'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
];

const compilerControls = ( props ) => (
	<div className={classes.CompilerControls}>
		<p>
			Current Price: CA$
			<span className={classes.Price}> {props.price.toFixed(2)}</span>
		</p>
		{controls.map(ctrl => (
			<CompilerControl 
				key={ctrl.label} 
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]} />
		))}
		<button 
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}>{props.isAuth ? 'Place Order' : 'Connect to Order'}</button>
	</div>
);

export default compilerControls;