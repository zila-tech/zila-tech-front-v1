import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { Tooltip } from 'react-tooltip';
// import './react-tooltip.css';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Skills.css';
import './Tooltip.css';
import Tooltip from './Tooltip';
import { NavItemEnum } from '../../constants';

const Skills = () => {
	const [experiences, setExperiences] = useState([]);
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		async function fetchSkillsAndExperiences() {
			const skillsResponse = await fetch(`${process.env.REACT_APP_API_URL}v3/skills/`);
			const skillData = await skillsResponse.json();
			setSkills(skillData);

			const experiencesResponse = await fetch(`${process.env.REACT_APP_API_URL}v3/experiences/`);
			const experiencesData = await experiencesResponse.json();
			setExperiences([...experiencesData]);

		}

		fetchSkillsAndExperiences();

	}, []);

	return (
		<React.Fragment>
			<h2 className='head-text'>Skills & Experiences</h2>

			<div className='app__skills-container'>
				<motion.div className='app__skills-list'>
					{skills.map((skill) => (
						<motion.div
							whileInView={{ opacity: [0, 1] }}
							transition={{ duration: 0.5 }}
							className='app__skills-item app__flex'
							key={skill.name}
						>
							<div
								className='app__flex'
								style={{ backgroundColor: skill.bgColor }}
							>
								<img src={skill.icon} alt={skill.name} />
							</div>
							<p className='p-text'>{skill.name}</p>
						</motion.div>
					))}
				</motion.div>
				<div className='app__skills-exp'>
					{experiences.map((experience) => (
						<motion.div className='app__skills-exp-item' key={experience.year}>
							<div className='app__skills-exp-year'>
								<p className='bold-text'>{experience.year}</p>
							</div>
							<motion.div className='app__skills-exp-works' id=''>
								{experience.works.map((work, index) => (
									<React.Fragment key={work.name}>
										{/* <Tooltip
											id={`${index}`}
											effect="solid"
											arrowColor="#fff"
											className="skills-tooltip"
											description={work.desc}
										>
											


										</Tooltip> */}
										<Tooltip id={`${work.name}-${index}`} position="top" content={work.desc}>
											<motion.div
												whileInView={{ opacity: [0, 1] }}
												transition={{ duration: 0.5 }}
												className='app__skills-exp-work'
												data-tip
												id={`${work.name}-${experience.year}`}
											>
												<h4 className='bold-text'>{work.name}
												</h4>
												{/* <p className='p-text'>{work.company}</p> */}
											</motion.div>
										</Tooltip>


									</React.Fragment>
								))}
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default AppWrap(
	MotionWrap(Skills, 'app__skills'),
	NavItemEnum.getName(3),
	'app__whitebg'
);
