import React, { useState, useEffect } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.css';
import { NavItemEnum } from '../../constants';
const Footer = () => {
	const [formData, setFormData] = useState({ name: '', email: '', message: '' });
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState({ contact: "", email: "" });
	const { name, email, message } = formData;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		setLoading(true);

		const contact = {
			name: name,
			email: email,
			message: message,
		};

		async function postContact() {
			const response = await fetch(`${process.env.REACT_APP_API_URL}v3/contacts/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			});


			if (response.ok) {
				setLoading(false);
				setIsFormSubmitted(true);
			}

		}

		postContact();
	};

	useEffect(() => {
		async function fetchInfo() {
			const infoResponse = await fetch(`${process.env.REACT_APP_API_URL}v3/info/`);
			const data = await infoResponse.json();
			const insite = data[0];
			setInfo(insite);
		}
		fetchInfo();
	}, []);

	return (
		<React.Fragment>
			<h2 className='head-text'>Java & Jargon: Chatting Zila Tech</h2>

			<div className='app__footer-cards'>
				<div className='app__footer-card '>
					<img src={images.email} alt='email' />
					<a href='mailto:olukotha@gmail.com' className='p-text'>
						{info.email}
					</a>
				</div>
				<div className='app__footer-card'>
					<img src={images.mobile} alt='phone' />
					<a href={`tel:${info.contact}`} className='p-text'>
						{info.contact}
					</a>
				</div>
			</div>
			{!isFormSubmitted ? (
				<div className='app__footer-form app__flex'>
					<div className='app__flex'>
						<input
							className='p-text'
							type='text'
							placeholder='Your Name'
							name='name'
							value={name}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='app__flex'>
						<input
							className='p-text'
							type='email'
							placeholder='Your Email'
							name='email'
							value={email}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<textarea
							className='p-text'
							placeholder='Your Message'
							value={message}
							name='message'
							onChange={handleChangeInput}
						/>
					</div>
					<button type='button' className='p-text' onClick={handleSubmit}>
						{!loading ? 'Send Message' : 'Sending...'}
					</button>
				</div>
			) : (
				<div>
					<h3 className='head-text'>Thank you for getting in touch!</h3>
				</div>
			)}
		</React.Fragment>
	);
};

export default AppWrap(
	MotionWrap(Footer, 'app__footer'),
	NavItemEnum.getName(5),
	'app__whitebg'
);
