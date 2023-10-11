import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Testimonial.css';
import { NavItemEnum } from '../../constants';

const Testimonial = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [testimonials, setTestimonials] = useState([]);
	const [brands, setBrands] = useState([]);

	const handleClick = (index) => {
		setCurrentIndex(index);
	};

	useEffect(() => {

		async function fetchBrandsAndTestimonials() {
			try {
				const [brandsResponse, testimonialsResponse] = await Promise.all([
					fetch(`${process.env.REACT_APP_API_URL}v3/brands/`),
					fetch(`${process.env.REACT_APP_API_URL}v3/testimonials/`),
				]);

				const [brandsData, testimonialsData] = await Promise.all([
					brandsResponse.json(),
					testimonialsResponse.json(),
				]);
				setBrands(brandsData);
				setTestimonials(testimonialsData);
			} catch (error) {

			}
		}

		fetchBrandsAndTestimonials();
	}, []);

	const test = testimonials[currentIndex];
	return (
		<React.Fragment>
			{testimonials.length > 0 && (
				<React.Fragment>
					<div className='app__testimonial-item app__flex'>
						<img src={test.imageurl} alt={test.name} />
						<div className='app__testimonial-content'>
							<p className='p-text'>{test.feedback}</p>
							<div>
								<h4 className='bold-text'>{test.name}</h4>
								<h5 className='p-text'>{test.company}</h5>
							</div>
						</div>
					</div>

					<div className='app__testimonial-btns app__flex'>
						<div
							className='app__flex'
							onClick={() =>
								handleClick(
									currentIndex === 0
										? testimonials.length - 1
										: currentIndex - 1
								)
							}
						>
							<HiChevronLeft />
						</div>

						<div
							className='app__flex'
							onClick={() =>
								handleClick(
									currentIndex === testimonials.length - 1
										? 0
										: currentIndex + 1
								)
							}
						>
							<HiChevronRight />
						</div>
					</div>
				</React.Fragment>
			)}

			<div className='app__testimonial-brands app__flex'>
				{brands.map((brand) => (
					<motion.div
						whileInView={{ opacity: [0, 1] }}
						transition={{ duration: 0.5, type: 'tween' }}
						key={brand.id}
					>
						<img src={brand.imageurl} alt={brand.name} />
					</motion.div>
				))}
			</div>
		</React.Fragment>
	);
};

export default AppWrap(
	MotionWrap(Testimonial, 'app__testimonial'),
	NavItemEnum.getName(4),
	'app__primarybg'
);
