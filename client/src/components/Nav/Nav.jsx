import React, { Component } from 'react';
import sword from "../../assets/weapon_red_gem_sword.png";

export class Nav extends Component {
	render() {
		return (
			<nav className="Nav">
				<h1>
					<img src={sword} alt="User Sprite Logo"/>
					HELMSKEEP
				</h1>
			</nav>
		);
	}
}

export default Nav;
