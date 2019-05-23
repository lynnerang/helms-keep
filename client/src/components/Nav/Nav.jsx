import React, { Component } from 'react';
import knight from "../../assets/knight_idle.png";

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

export default Nav;
