import React from 'react';
// import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
const SocialMedia = () => {

	const openSocialMedia = (url) => {
		window.open(url, '_blank');
	};
	return (

		<div className='app__social'>
			<div onClick={() => openSocialMedia('https://web.facebook.com/zilatech')}>
				<FaFacebookF />
			</div>
			<div onClick={() => openSocialMedia('https://twitter.com/zila_tech')}>
				<FaTwitter />
			</div>
			<div onClick={() => openSocialMedia('https://www.youtube.com/@ZilaTech')}>
				<FaYoutube />
			</div>
			<div onClick={() => openSocialMedia('https://www.instagram.com/zilatech')}>
				<FaInstagram />
			</div>
			<div onClick={() => openSocialMedia('https://www.tiktok.com/@zilatech992')}>
				<FaTiktok />
			</div>
		</div>
	);
};

export default SocialMedia;
