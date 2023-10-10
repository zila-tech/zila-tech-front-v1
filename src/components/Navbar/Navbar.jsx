import React, { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { NavItems } from '../../constants';
import './Navbar.css';

const Navbar = () => {
	const [toggle, setToggle] = useState(false);
	const [firmData, setFirmData] = useState({});
	useEffect(() => {
		async function fetchFirmData() {
			const response = await fetch(`${process.env.REACT_APP_API_URL}v3/firmLogos/`);
			const data = await response.json();
			document.querySelector("title").innerText = data[0].title;

			setFirmData(data[0]);
			const link = document.querySelector("link[rel~='icon']");
			if (link) {
				link.href = data[0].logo;
			}
		}
		fetchFirmData();
	}, []);
	return (
		<nav className='app__navbar'>
			<div className='app__navbar-logo'>
				<img src={firmData.logo} alt='logo' />
			</div>
			<ul className='app__navbar-links'>
				{NavItems.map((item) => (
					<li className='app__flex p-text' key={`link-${item}`}>
						<div />
						<a href={`#${item}`}>{item}</a>
					</li>
				))}
			</ul>

			<div className='app__navbar-menu'>
				<HiMenuAlt4 onClick={() => setToggle(true)} />

				{toggle && (
					<motion.div
						whileInView={{ x: [300, 0] }}
						transition={{ duration: 0.85, ease: 'easeOut' }}>
						<HiX onClick={() => setToggle(false)} />
						<ul>
							{['home', 'about', 'work', 'skills', 'contact'].map((item) => (
								<li key={item}>
									<a href={`#${item}`} onClick={() => setToggle(false)}>
										{item}
									</a>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
