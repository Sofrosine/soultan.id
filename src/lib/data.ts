// Add lastModified date to project and blog interfaces
interface Project {
    title: string;
    slug?: string;
    description: string;
    image: string;
    technologies: string[];
    github?: string;
    demo?: string;
    features?: string[];
    challenges?: string;
    lastModified?: string; // New field for sitemap
}

interface BlogPost {
    title: string;
    slug: string;
    date: string;
    readTime: number;
    excerpt: string;
    coverImage: string;
    tags: string[];
    content: string;
    lastModified?: string; // New field for sitemap
}


export const projects: Project[] = [
    {
        title: 'My Wedding Website',
        slug: 'wedding-website',
        description: 'A personal wedding website created to share event details, collect RSVPs, and showcase photos. Built with Next.js and TailwindCSS, this project combines aesthetic design with practical functionality for wedding guests.',
        image: '/images/portofolio/p-ghinsoul.png',
        technologies: ['TypeScript', 'Next.js', 'TailwindCSS'],
        demo: 'https://ghina.soultan.id/',
        features: [
            'Event details and schedule information',
            'Digital RSVP system',
            'Interactive maps and venue information',
            'Photo gallery and couple story section',
            'Mobile-optimized experience for all guests'
        ],
        challenges: 'Creating a website that balanced aesthetic appeal with functionality while ensuring it loaded quickly on mobile networks during the event required careful optimization of assets and responsive design implementation.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Sekula Indonesia',
        slug: 'sekula-indonesia',
        description: 'SEKULA Indonesia is a comprehensive SaaS dashboard platform designed specifically for educational institutions in Indonesia to streamline their data management processes. The system provides powerful tools that help schools, universities, and educational organizations digitize administrative workflows, manage student information, and generate insightful analytics for better decision-making.',
        image: '/images/portofolio/p-sekula.png',
        technologies: ['Next.js', 'TypeScript', 'Golang', 'PostgreSQL', 'RabbitMQ', 'Docker', 'CI/CD'],
        demo: 'https://www.sekulaindonesia.com',
        features: [
            'Centralized educational data management system',
            'Multi-level user access controls for administrators, teachers, and staff',
            'Student information management with academic performance tracking',
            'Financial module for fee management and reporting',
            'Customizable dashboards with real-time analytics',
            'Document digitization and management system',
            'Compliance with Indonesian educational regulations and standards'
        ],
        challenges: 'Developing a system that could accommodate the diverse needs of various educational institutions while ensuring compliance with Indonesian regulations required extensive research and stakeholder interviews. Additionally, creating a scalable architecture that could handle large volumes of data while maintaining performance across different regions with varying internet connectivity presented significant technical challenges. I implemented a modular design with careful database optimization and offline-first capabilities to ensure reliability in all usage scenarios.',
        lastModified: '2025-06-07',
    },
    {
        title: 'IBHC 2024',
        slug: 'ibhc-2024',
        description: 'The official website for the International Bioethics & Humanities Conference 2024, a prestigious event organized by UNESCO and Universitas Gadjah Mada (UGM). Developed a comprehensive platform for attendee registration, program information, and conference materials.',
        image: '/images/portofolio/p-ibhc2024.png',
        technologies: ['Golang', 'MySQL', 'TypeScript', 'Next.js', 'TailwindCSS', 'Docker'],
        demo: 'https://www.ibhc2024.id/',
        features: [
            'Secure participant registration system',
            'Conference schedule and program management',
            'Speaker profiles and presentation materials',
            'Administrative dashboard for organizers',
            'Dockerized deployment for consistent environments'
        ],
        challenges: 'Creating a system that could handle high traffic during registration periods while ensuring data security for an international academic event required careful architecture planning. I implemented database optimizations and caching strategies to maintain performance under load.',
        lastModified: '2025-06-07',
    },
    {
        title: 'MentorGue',
        slug: 'mentorgue',
        description: 'A sophisticated mobile application offering premium books and audiobooks through subscription plans. Developed with React Native to provide a seamless reading and listening experience for users seeking personal and professional development content.',
        image: '/images/portofolio/p-mentorgue.png',
        technologies: ['TypeScript', 'React Native', 'Node.js', 'Firebase', 'TrackPlayer', 'CodePush'],
        demo: 'https://play.google.com/store/apps/details?id=com.mentor.gue',
        features: [
            'Subscription-based access to premium content',
            'Integrated audiobook player with background playback',
            'Offline reading and listening capabilities',
            'Personalized recommendations based on user preferences',
            'Over-the-air updates via CodePush for quick iterations'
        ],
        challenges: 'Implementing a reliable audio player that worked consistently across different device models while managing background playback and audio controls was technically challenging. I utilized TrackPlayer with custom hooks to create a robust audio experience.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Hellocaddy',
        slug: 'hellocaddy',
        description: 'A feature-rich mobile application for golf enthusiasts, offering comprehensive exploration and booking of golf facilities. Integrated with Bluetooth technology for golf accessories and secure payment processing via Stripe.',
        image: '/images/portofolio/p-hellocaddy.png',
        technologies: ['TypeScript', 'React Native', 'Redux Toolkit', 'Firebase', 'Bluetooth', 'Stripe', 'QR Scanner'],
        features: [
            'Interactive map of golf courses.',
            'Real-time tee time availability and booking',
            'Bluetooth integration with golf accessories',
            'Secure payment processing via Stripe',
            'Digital scorecard and performance tracking'
        ],
        challenges: 'Implementing reliable Bluetooth connectivity across various device models while maintaining a smooth user experience required extensive testing and optimization. Additionally, integrating with multiple APIs for course data and payment processing required careful error handling and state management.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Fakultas Kedokteran Trisakti Mobile App',
        slug: 'fk-trisakti',
        description: 'A comprehensive mobile application designed specifically for medical clerkship (KOAS) management at Trisakti Medical Faculty. This purpose-built platform streamlines the complex administrative requirements of clinical rotations for medical students, allowing them to focus on their medical training rather than paperwork. The app digitizes the entire clerkship experience from documentation to evaluation, scheduling, and performance tracking.',
        image: '/images/portofolio/p-trisakti.png',
        technologies: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit'],
        demo: '',
        features: [
            'Digital logbook creation and submission for clinical procedures',
            'Comprehensive evaluation system for supervisors to assess student performance',
        ],
        challenges: 'Developing a system that adhered to strict medical education standards while creating an intuitive interface for both busy medical students and clinical supervisors required extensive domain research and user testing. Additionally, ensuring patient data privacy and compliance with healthcare regulations presented significant challenges. I implemented a secure architecture with robust encryption and careful access controls while maintaining responsive performance on various mobile devices used in clinical settings.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Smartcart by ITC',
        slug: 'smartcart-itc',
        description: 'A specialized mobile application developed for International Test Center (ITC) customers, facilitating registration for certification exams and purchase of learning/training programs. Streamlined the entire process from browsing available courses to registration and payment.',
        image: '/images/portofolio/p-itc.png',
        technologies: ['TypeScript', 'React Native', 'Firebase', 'CodePush'],
        demo: 'https://play.google.com/store/apps/details?id=com.smartcart.itc',
        features: [
            'Certification exam registration system',
            'Training program catalog with detailed information',
            'Secure payment gateway integration',
            'User profile with certification history',
            'Push notifications for exam dates and results'
        ],
        challenges: "Creating a reliable system that could handle different certification types and their specific requirements while maintaining data integrity between the app and ITC's backend systems required careful API design and robust error handling.",
        lastModified: '2025-06-07',
    },
    {
        title: 'Gaia Safari',
        slug: 'gaia-safari',
        description: 'A premium website for Gaia Safari travel services, showcasing adventure tours and safari experiences. Built with Nuxt.js and integrated with Storyblok CMS for easy content management by the client team.',
        image: '/images/portofolio/p-gaia.jpeg',
        technologies: ['Nuxt.js', 'TypeScript', 'Storyblok API', 'TailwindCSS'],
        demo: 'https://www.gaiasafaris.com/',
        features: [
            'Immersive visual design highlighting safari destinations',
            'Interactive tour booking system',
            'Content management through Storyblok for non-technical staff',
            'Responsive design for all devices',
            'Performance optimization for image-heavy content'
        ],
        challenges: 'Managing the complex integration with Storyblok CMS while maintaining fast load times for high-resolution imagery was challenging. I implemented lazy loading and image optimization strategies to deliver a seamless user experience despite the content-rich nature of the site.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Bikin Acara',
        slug: 'bikin-acara',
        description: 'An innovative online party planning platform that simplifies event organization. Users can plan, budget, and manage guest lists for various celebrations through an intuitive interface that streamlines the entire event planning process.',
        image: '/images/portofolio/p-bikinacara.png',
        technologies: ['TypeScript', 'Next.js', 'React Query', 'Recoil', 'Firebase'],
        demo: 'https://www.bikinacara.com/',
        features: [
            'Drag-and-drop event planning tools',
            'Vendor marketplace integration',
            'Guest list management with RSVP tracking',
            'Budget calculator and expense tracking',
            'Event timeline creation and management'
        ],
        challenges: 'Balancing complex state management across multiple planning features while maintaining performance was a significant challenge. I implemented Recoil with React Query to create a responsive application that could handle complex state requirements without sacrificing user experience.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Tamamedi',
        slug: 'tamamedi',
        description: 'A comprehensive educational platform offering complete practice exams in health sciences, including specialized competency assessments for doctors, dentists, nurses, midwives, and pharmacists. Helps medical professionals prepare for certification and licensing exams.',
        image: '/images/portofolio/p-tamamedi.png',
        technologies: ['TypeScript', 'React Native', 'React Query', 'Recoil', 'Firebase'],
        demo: 'https://play.google.com/store/apps/details?id=com.tamamedi',
        features: [
            'Specialized exam simulations for different medical fields',
            'Performance analytics and progress tracking',
            'Timed testing environments mimicking real exams',
            'Detailed explanations for all questions',
            'Study planning and scheduling tools'
        ],
        challenges: 'Designing an architecture that could support the complex testing formats required for different medical specialties while providing accurate performance analytics was technically demanding. I implemented custom rendering engines for different question types and a flexible scoring system.',
        lastModified: '2025-06-07',
    },

    {
        title: 'Hellocaddy Biz',
        slug: 'hellocaddy-biz',
        description: 'A companion business application to Hellocaddy, designed for golf facility managers. This app enables comprehensive management of golf courses, including tee time scheduling, facility details, and customer management through an intuitive mobile interface.',
        image: '/images/portofolio/p-hellocaddybiz.png',
        technologies: ['TypeScript', 'React Native', 'Redux Toolkit', 'Firebase', 'QR Scanner'],
        features: [
            'Facility management dashboard with real-time metrics',
            'Staff scheduling and management tools',
            'Tee time availability control and booking management',
            'Customer data and preferences tracking',
            'QR code generation for facility access and verification'
        ],
        challenges: 'Creating a business application that balanced comprehensive management features with ease of use for non-technical staff was challenging. I focused on intuitive UX design while still providing the powerful functionality needed by business users.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Golden Mulia',
        slug: 'golden-mulia',
        description: 'An e-commerce mobile application for purchasing gold products online, built on the Ignite boilerplate for optimal performance and maintainability. Provides secure transactions and real-time gold price updates.',
        image: '/images/portofolio/p-goldenmulia.png',
        technologies: ['Ignite CLI', 'TypeScript', 'React Native', 'MobX State Tree', 'Firebase'],
        features: [
            'Real-time gold price tracking',
            'Secure transaction processing',
            'Product catalog with detailed specifications',
            'User profile with purchase history',
            'Wishlist and favorites functionality'
        ],
        challenges: 'Creating a secure platform for high-value transactions while maintaining real-time price updates based on fluctuating gold markets required careful architecture planning. I implemented a combination of server validation and client-side checks to ensure transaction security.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Solo Great Sale',
        slug: 'solo-great-sale',
        description: 'A comprehensive mobile application for the annual Solo Great Sale events in 2021, 2022, and 2023. The platform connected consumers with participating merchants, managed promotions, and facilitated digital transactions during this major shopping festival in Solo, Indonesia.',
        image: '/images/portofolio/p-sgs.png',
        technologies: ['Golang', 'MySQL', 'TypeScript', 'React Native', 'Docker', 'Context API', 'Firebase'],
        demo: 'https://play.google.com/store/apps/details?id=com.sgsremake',
        features: [
            'Interactive map of participating merchants',
            'Digital coupons and promotion system',
            'Event schedule and notifications',
            'User loyalty program and points',
            'Merchant dashboard for promotion management'
        ],
        challenges: 'Scaling the application to handle traffic spikes during the festival period while maintaining consistent performance across three years of events required continuous architecture improvements. I implemented backend optimizations and caching strategies to support growing user numbers each year.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Amazing Force',
        slug: 'amazing-force',
        description: 'A comprehensive financial planning application designed to help users manage their finances, set financial goals, track expenses, and plan investments. Features an intuitive interface built with React Native and enhanced with Tailwind styling.',
        image: '/images/portofolio/p-amazing.png',
        technologies: ['TypeScript', 'React Native', 'Recoil', 'Tailwind-RN', 'Firebase'],
        demo: 'https://play.google.com/store/apps/details?id=com.amazingforce',
        features: [
            'Budget planning and expense tracking',
            'Financial goal setting and progress monitoring',
            'Investment portfolio management',
            'Expense categorization and analysis',
            'Financial health indicators and recommendations'
        ],
        challenges: 'Creating intuitive data visualizations for complex financial information while ensuring data privacy and security presented significant challenges. I implemented custom chart components and secure local storage strategies to address these concerns.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Takenaka',
        slug: 'takenaka',
        description: 'An internal task management application built for staff and management to streamline project workflows and reporting. Developed using the Osmi Kit Boilerplate, this app enables efficient task assignment, progress tracking, and report generation.',
        image: '/images/portofolio/p-takenaka.png',
        technologies: ['Osmi CSX', 'JavaScript', 'React Native', 'Redux Saga', 'Firebase'],
        features: [
            'Task assignment and delegation system',
            'Real-time progress tracking',
            'Automated reporting tools',
            'Team performance analytics',
            'Deadline management and notifications'
        ],
        challenges: 'Building an internal tool that satisfied both staff and management requirements with different permission levels and workflows required careful UX planning. I implemented role-based access controls and customizable views to address the diverse needs of different user types.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Batik Senowati',
        slug: 'batik-senowati',
        description: 'An e-commerce platform showcasing traditional Indonesian Batik products from Senowati. The website features a seamless shopping experience with secure payment processing through Midtrans integration, product customization options, and detailed information about batik craftsmanship.',
        image: '/images/portofolio/p-senowati.png',
        technologies: ['TypeScript', 'Next.js', 'Golang', 'MySQL', 'Docker', 'Midtrans'],
        demo: 'https://senowati-fe.vercel.app/',
        features: [
            'Product catalog with advanced filtering',
            'Secure payment processing via Midtrans',
            'User accounts with order history',
            'Batik pattern customization options',
            'Educational content about batik traditions'
        ],
        challenges: 'Implementing a system that could handle custom orders with variations in batik patterns while integrating with the Midtrans payment gateway required careful API design and robust validation logic.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Edvisee',
        slug: 'edvisee',
        description: 'A blockchain-based web application for job listings and document management. Edvisee allows users to apply for positions and manage their professional documents securely using blockchain technology for verification and authentication.',
        image: '/images/portofolio/p-edvisee.png',
        technologies: ['TypeScript', 'Next.js', 'React Query', 'Recoil'],
        demo: 'https://edvisee.id/',
        features: [
            'Blockchain-verified document storage',
            'Job listing and application system',
            'Secure user profile management',
            'Document authenticity verification',
            'Employer dashboard for applicant management'
        ],
        challenges: 'Implementing blockchain integration for document verification while maintaining an intuitive user experience for non-technical users required careful abstraction of complex blockchain concepts behind a simple interface.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Akuntan Pribadiku',
        slug: 'akuntan-pribadiku',
        description: 'A professional landing page for an accounting services company, designed to showcase their services, team expertise, and client testimonials. The site features modern design with smooth animations and responsive layouts built with Next.js and TailwindCSS.',
        image: '/images/portofolio/p-akuntanpribadi.png',
        technologies: ['TypeScript', 'Next.js', 'TailwindCSS'],
        demo: 'https://www.akuntanpribadiku.com/',
        features: [
            'Service showcase with detailed descriptions',
            'Team member profiles highlighting expertise',
            'Client testimonials and success stories',
            'Contact form with service request options',
            'Responsive design with modern animations'
        ],
        challenges: 'Creating a professional site that effectively communicated complex accounting services to potential clients required careful UX planning and content organization to present technical information in an accessible way.',
        lastModified: '2025-06-07',
    },
    {
        title: 'Soulna Entertainment',
        slug: 'soulna-entertainment',
        description: 'A dynamic landing page for Soulna Entertainment, showcasing their event management services, past performances, and booking information. The site features a modern design with interactive elements and media galleries.',
        image: '/images/portofolio/p-soulna.png',
        technologies: ['TypeScript', 'Next.js', 'TailwindCSS'],
        demo: 'https://soulna-entertaiment.vercel.app/',
        features: [
            'Showcase gallery of past events',
            'Service packages with detailed information',
            'Artist profiles and performance samples',
            'Booking system with availability calendar',
            'Testimonials from previous clients'
        ],
        challenges: 'Optimizing media-rich content for fast loading while maintaining high visual quality required implementing advanced lazy loading strategies and next-generation image formats.',
        lastModified: '2025-06-07',
    },
];

export default projects;
export const blogPosts: BlogPost[] = [
    {
        title: 'Mastering TypeScript: Advanced Types and Patterns',
        slug: 'mastering-typescript-advanced-types-patterns',
        date: 'May 15, 2025',
        readTime: 10,
        excerpt: 'Explore advanced TypeScript features like conditional types, mapped types, and utility types to write more robust and maintainable code.',
        coverImage: '/images/blog/typescript-advanced.jpg',
        tags: ['TypeScript', 'JavaScript', 'Web Development'],
        content: `<p>This is a placeholder for the full blog post content about TypeScript advanced types and patterns.</p>`,
        lastModified: '2025-06-07', // This could be the same as the publication date
    },
];