import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
	<div className={classes.Space}>
		<div className={classes.Spinner}>Loading...</div>
	</div>
);

export default spinner;