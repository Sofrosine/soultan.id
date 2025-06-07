'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sofrosine' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/soultanma' },
    { name: 'Instagram', url: 'https://instagram.com/soultan.muh' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="font-bold text-xl">
              Soultan.id
            </Link>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Software Engineer • Problem Solver • Creator
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} Soultan Muhammad Albar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;