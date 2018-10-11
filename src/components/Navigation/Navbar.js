import React from 'react';
import { withRouter } from 'react-router';
import Navlink from './Navlink';

const Navbar = (props) => {
	let navlink = <Navlink route='/signin' link='Signout' />
	let newTask = <li className='nav__item'>New Task</li>;
	if (props.location.pathname === '/signin') {
		newTask = null;
		navlink = <Navlink route='/register' link='Register' />
	} else if (props.location.pathname === '/register') {
		newTask = null;
		navlink = <Navlink route='/signin' link='Signin' />
	}
	
	return (
	  <nav className='nav'>
			<span className='nav__heading'>TODO</span>
			<ul className='nav__list'>
				{ navlink }
				{ newTask }
			</ul>
		</nav>
	)
}

export default withRouter(Navbar);