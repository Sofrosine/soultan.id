'use client';

import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
            <div className="container mx-auto">
                <motion.div
                    ref={ref}
                    initial={{opacity: 0, y: 20}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.6}}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <motion.div
                        initial={{opacity: 0, x: -30}}
                        animate={inView ? {opacity: 1, x: 0} : {opacity: 0, x: -30}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="md:w-1/2"
                    >
                        <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {"With 5 years of experience in product development, I've contributed to dynamic, fast-paced environments—including pre-Series B startups—and have successfully collaborated with clients from Hong Kong and South Korea."}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {"As a software engineer, I've delivered numerous projects using technologies like Next.js, React.js, React Native and Golang, following best practices across the entire product lifecycle."}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            {"My passion for technology drives me to create robust, scalable solutions that solve real business problems while delivering exceptional user experiences."}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, x: 30}}
                        animate={inView ? {opacity: 1, x: 0} : {opacity: 0, x: 30}}
                        transition={{duration: 0.6, delay: 0.4}}
                        className="md:w-1/2"
                    >
                        <h3 className="text-2xl font-bold mb-4">Professional Highlights</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">Startup Experience:</span> Contributed to pre-Series B startups in fast-paced environments
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">International Clients:</span> Successfully collaborated with clients from Hong Kong and South Korea
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">Technical Expertise:</span> Next.js, React.js, React Native, and Golang
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">Product Lifecycle:</span> Experience across the entire product development lifecycle
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;