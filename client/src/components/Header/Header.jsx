import React, { Component } from 'react';
import Banner from '../Banner/Banner';
import Nav from '../Nav/Nav';

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
