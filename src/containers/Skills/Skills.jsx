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
			try {
				const [skillsResponse, experiencesResponse] = await Promise.all([
					fetch(`${process.env.REACT_APP_API_URL}v3/skills/`),
					fetch(`${process.env.REACT_APP_API_URL}v3/experiences/`),
				]);

				const [skillData, experiencesData] = await Promise.all([
					skillsResponse.json(),
					experiencesResponse.json(),
				]);

				setSkills(skillData);
				setExperiences([...experiencesData]);
			} catch (error) {

			}
		}

		fetchSkillsAndExperiences();

	}, []);

	return (
		<React.Fragment>
			<h2 className='head-text'>Services & Experience</h2>

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
