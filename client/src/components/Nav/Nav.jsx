import React, { Component } from 'react';
import knight from "../../assets/knight_idle.png";
import PropTypes from 'prop-types';

export class Nav extends Component {
	render() {
		return (
			<nav className="Nav">
				<h1>
					<img src={knight} alt="User Sprite Logo"/>
					HELMSKEEP
				</h1>
			</nav>
		);
	}
}

Nav.propTypes = {

}

export default Nav;
