import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Slider from '../../components/Slider/Slider';

class SliderCompiler extends Component {
    render () {
        return (
            <Aux>
                <Slider />
                <div>Compiler Controls</div>
            </Aux>
        );
    }
}

export default SliderCompiler;