import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import SliderCompiler from './containers/SliderCompiler/SliderCompiler';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<SliderCompiler />
				</Layout>
			</div>
		);
	}
}

export default App;
