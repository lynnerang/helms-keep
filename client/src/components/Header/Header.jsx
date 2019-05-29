import React, { Component } from 'react';
import Banner from '../Banner/Banner';
import Nav from '../Nav/Nav';
import PropTypes from 'prop-types';

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

Header.propTypes = {
	
}