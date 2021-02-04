import React from 'react';

import classes from './Slider.css';
import SliderIngredient from './SliderIngredient/SliderIngredient';

const slider = ( props ) => {
    return (
        <div className={classes.Slider}>
            <SliderIngredient type="bun-top" />
            <SliderIngredient type="lettuce" />
            <SliderIngredient type="cheese" />
            <SliderIngredient type="bacon" />
            <SliderIngredient type="meat" />
            <SliderIngredient type="bun-bottom" />
        </div>
    );
};

export default slider;