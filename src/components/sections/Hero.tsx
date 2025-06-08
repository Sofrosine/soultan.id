'use client';

import {motion} from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center py-20 px-4 relative overflow-hidden">
            {/* Background gradient */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10"/>

            {/* Animated background shapes */}
            <motion.div
                className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-900/20 blur-3xl -z-5"
                animate={{
                    x: [0, 30, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            <motion.div
                className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-purple-200 dark:bg-purple-900/20 blur-3xl -z-5"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        className="md:w-1/2"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="block">{"Hi, I'm "}</span>
                            <span className="text-blue-600 dark:text-blue-500">Soultan Muhammad Albar</span>
                        </h1>
                        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
                            Software Engineer with 5+ years experience
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
                            I build exceptional digital experiences with cutting-edge technologies.
                            {" Let's bring your ideas to life with clean, efficient, and scalable solutions."}</p>
                        <div className="flex flex-wrap gap-4">
                            <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                                <Link
                                    href="/projects"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    View My Work
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                                <Link
                                    href="#contact"
                                    className="px-6 py-3 border border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    Contact Me
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="md:w-1/2 flex justify-center"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.8, delay: 0.2}}
                    >
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <div
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-xl opacity-20 animate-pulse"/>
                            <div
                                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                                {/* Replace with your own image */}
                                <Image
                                    src="/images/profile.jpeg"
                                    alt="Soultan Muhammad Albar"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;