import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SliderCompiler} from './SliderCompiler';
import CompilerControls from '../../components/Slider/CompilerControls/CompilerControls';

configure({adapter: new Adapter()});

describe('<SliderCompiler />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<SliderCompiler onInitIngredients={() => {}} />);
	});

	it('should render <CompilerControls /> when receiving ingredients', () => {
	wrapper.setProps({ings: {cheese: 0}});
	expect(wrapper.find(CompilerControls)).toHaveLength(1);
	});
});