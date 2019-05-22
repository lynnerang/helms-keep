import React, { Component } from 'react';
import Banner from '../banner/Banner';
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
