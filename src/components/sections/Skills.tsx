'use client';

import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import Image from 'next/image';

// Updated skills array with image paths
const skills = [
    {name: 'Next.js', icon: '/images/skills/nextjs.svg'},
    {name: 'Nuxt.js', icon: '/images/skills/nuxtjs.svg'},
    {name: 'React/React Native', icon: '/images/skills/react.svg'},
    {name: 'TypeScript', icon: '/images/skills/typescript.svg'},
    {name: 'Node.js', icon: '/images/skills/nodejs.svg'},
    {name: 'Golang', icon: '/images/skills/go.svg'},
    {name: 'MySQL & PostgreSQL', icon: '/images/skills/database.svg'},
    {name: 'MongoDB', icon: '/images/skills/mongodb.svg'},
    {name: 'Redis', icon: '/images/skills/redis.svg'},
    {name: 'RabbitMQ', icon: '/images/skills/rabbitmq.svg'},
    {name: 'Elasticsearch', icon: '/images/skills/elasticsearch.svg'},
    {name: 'AWS', icon: '/images/skills/aws.svg'},
    {name: 'Docker', icon: '/images/skills/docker.svg'},
    {name: 'CI/CD Pipelines', icon: '/images/skills/cicd.svg'},
];

const Skills = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.6}},
    };

    return (
        <section id="skills" className="py-20 px-4 bg-white dark:bg-gray-900">
            <div className="container mx-auto">
                <motion.div
                    ref={ref}
                    initial={{opacity: 0, y: 20}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.6}}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
                    <p className="text-gray-700 dark:text-gray-300">
                        My technical toolkit and expertise in various technologies and frameworks.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
                            whileHover={{y: -5, transition: {duration: 0.2}}}
                        >
                            <div className="w-16 h-16 relative mb-4">
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-center">{skill.name}</h3>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.6, delay: 0.6}}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl font-bold mb-6">Development Tools & Practices</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            'Some AI Models',
                            'Git', 'GitHub', 'Bitbucket', 'GitLab',
                            'GitHub Actions', 'Bitbucket Pipeline', 'GitLab CI',
                            'Intellij IDEA', 'Docker', 'Kubernetes', 'Agile/Scrum',
                            'TDD', 'Clean Architecture', 'REST API'
                        ].map((tool, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
                            >
                {tool}
              </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;