'use client';

import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

const experiences = [
    {
        title: 'Frontend Engineer',
        company: 'Gani.ai',
        companyUrl: 'https://www.gani.ai',
        location: 'Indonesia (Remote)',
        type: 'Contract',
        duration: 'Jun 2025 - Present',
        description: [
            'Developed and maintained the frontend of Gani.ai, a specialized legal AI platform featuring an intelligent chatbot for legal consultations and guidance.',
            'Built responsive and intuitive user interfaces using React.js to deliver seamless interactions between users and the AI-powered legal assistant.',
            'Collaborated with Backend & AI teams to integrate legal AI capabilities into the web platform, ensuring accurate and accessible legal information delivery.'
        ],
        tech: ['React.js'],
    },
    {
        title: 'Senior Frontend Engineer',
        company: 'Yindjin Genggam Bersama',
        companyUrl: 'https://www.yindjin.tech',
        location: 'Indonesia (Remote)',
        type: 'Part time',
        duration: 'Jan 2025 - Present',
        description: [
            'Developed and enhanced XL Axiata\'s internal web platforms using Next.js to ensure smooth user interactions and performance.',
            'Implemented CI/CD pipelines for automated deployments on AWS CloudFront & S3 using GitLab CI and Docker.',
            'Collaborated closely with design and backend teams to bring new features to life seamlessly.'
        ],
        tech: ['Next.js', 'AWS CloudFront', 'S3', 'GitLab CI', 'Docker'],
    },
    {
        title: 'Frontend Engineer',
        company: 'Hyperhire',
        companyUrl: 'https://www.hyperhire.in',
        location: 'Seoul, South Korea (Remote)',
        type: 'Contract',
        duration: 'Nov 2024 - April 2025',
        description: [
            'Maintained and improved a Reddit-like web platform for clients, delivering optimal user experience with Next.js.',
            'Worked hand-in-hand with designers and backend developers to ensure polished feature rollouts.',
            'Constantly iterated and optimized based on user feedback and performance insights.'
        ],
        tech: ['Next.js', 'React', 'TypeScript', 'UI/UX', 'Performance Optimization'],
    },
    {
        title: 'Senior Programmer',
        company: 'ATech Solution Limited',
        companyUrl: 'https://www.atech.software',
        location: 'Hong Kong (Remote)',
        type: 'Contract',
        duration: 'Sept 2023 - Dec 2024',
        description: [
            'Built and secured critical systems using AWS Cognito and Lambda for reliable authentication and data protection.',
            'Authored clear technical documentation to maintain team alignment and transparency.',
            'Delivered essential security-driven projects, including Authentication Systems, Vulnerability Scanning, Log Search Engines, and CI/CD templates.'
        ],
        tech: ['AWS Cognito', 'Lambda', 'Security Systems', 'Technical Documentation', 'CI/CD'],
    },
    {
        title: 'Mobile Engineer',
        company: 'Dagangan Indonesia',
        companyUrl: 'https://www.dagangan.com',
        location: 'Yogyakarta (Remote)',
        type: 'Full-time',
        duration: 'Dec 2020 - Oct 2023',
        description: [
            'Led development and performance optimization for Dagangan\'s mobile app using React Native.',
            'Spearheaded app deployment to the Google Play Store.',
            'Rolled out impactful features such as Payment Integration, Event Tracking, Vulnerability Scanning, A/B Testing, and In-App Updates.'
        ],
        tech: ['React Native', 'Google Play Store', 'Payment Integration', 'A/B Testing', 'Event Tracking'],
    },
    {
        title: 'Freelance Software Engineer',
        company: 'Self-employed',
        location: 'Remote',
        type: 'Contract/Project based',
        duration: 'April 2020 - Present',
        description: [
            'Partnered with diverse clients to design and build custom web and mobile applications using Next.js, Nuxt.js, React Native, and Go.',
            'Managed full project cycles—from requirement gathering, development, to deployment—implementing CI/CD workflows with Docker and GitHub Actions.'
        ],
        tech: ['Next.js', 'Nuxt.js', 'React Native', 'Go', 'Docker', 'GitHub Actions'],
    },
    {
        title: 'Mobile Engineer',
        company: 'Gomodo Technologies',
        location: 'Yogyakarta',
        type: 'Full-time',
        duration: 'Feb 2020 - Nov 2020',
        description: [
            'Contributed to frontend feature development, maintaining user-centric web products for B2B e-commerce clients.'
        ],
        tech: ['React Native', 'Next.js', 'Typescript'],
    },
];
const Experience = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.6}},
    };

    return (
        <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto">
                <motion.div
                    ref={ref}
                    initial={{opacity: 0, y: 20}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.6}}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
                    <p className="text-gray-700 dark:text-gray-300">
                        My professional journey spanning international collaborations, startups, and diverse technical
                        challenges.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative border-l-4 border-blue-600 pl-6 ml-4">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="mb-12 relative"
                            >
                                {/* Timeline dot */}
                                <div
                                    className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[34px] top-1.5 border-4 border-white dark:border-gray-800"></div>

                                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                                    <div className="flex flex-wrap justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {experience.title}
                                        </h3>
                                        <span
                                            className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                      {experience.duration}
                    </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <h4 className="text-md font-medium text-gray-600 dark:text-gray-400">
                                            {experience.companyUrl ? (
                                                <a
                                                    href={experience.companyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    {experience.company}
                                                </a>
                                            ) : (
                                                experience.company
                                            )}
                                        </h4>
                                        <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-500">
                      {experience.location}
                    </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                                        <span className="text-sm italic text-gray-500 dark:text-gray-500">
                      {experience.type}
                    </span>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        {experience.description.map((desc, descIndex) => (
                                            <p key={descIndex} className="text-gray-700 dark:text-gray-300">
                                                • {desc}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.tech.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                                            >
                        {tech}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;