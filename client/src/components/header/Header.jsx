import React, { Component } from './node_modules/react';
import Banner from '../Banner/Banner';
import Nav from '../nav/Nav';

export class Header extends Component {
	render() {
		return (
      <header className="Header">
				<Nav />
				<Banner />
			</header>
		);
	}
}
