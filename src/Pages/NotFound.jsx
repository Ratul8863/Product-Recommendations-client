import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const floatingAnimation = `
    @keyframes floating {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(2deg); }
        100% { transform: translateY(0px) rotate(0deg); }
    }
`;

const NotFound = () => {
    const navigate = useNavigate();

    // Staggered animation for the "404" title
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10,
            },
        },
    };
    
    // Variants for the flying background elements
    const backgroundVariants = {
        animate: {
            rotate: 360,
            scale: [1, 1.2, 1],
            transition: {
                repeat: Infinity,
                duration: 20,
                ease: "linear",
            },
        },
    };

    // Variants for the main text fade-in
    const textVariants = {
        hidden: { opacity: 0, y: 30, scaleY: 0.8 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scaleY: 1,
            transition: { 
                duration: 0.6, 
                ease: "easeOut" 
            }
        },
    };

    return (
        <div className="relative overflow-hidden flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 px-4">
            {/* Background Animations: "Flying" elements */}
            <motion.div
                className="absolute w-80 h-80 bg-lime-500/20 dark:bg-lime-500/10 rounded-full blur-3xl"
                variants={backgroundVariants}
                animate="animate"
                style={{ top: '20%', left: '15%' }}
            />
            <motion.div
                className="absolute w-60 h-60 bg-red-500/20 dark:bg-red-500/10 rounded-full blur-3xl"
                variants={backgroundVariants}
                animate="animate"
                style={{ bottom: '10%', right: '10%' }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear", delay: 2 }}
            />
            <motion.div
                className="absolute w-40 h-40 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl"
                variants={backgroundVariants}
                animate="animate"
                style={{ top: '60%', right: '30%' }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear", delay: 4 }}
            />

            <style>{floatingAnimation}</style>
            
            <motion.div
                className="relative bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-10 max-w-2xl text-center border-t-8 border-lime-500 transition-all duration-300 z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ rotateY: 5, rotateX: 5 }}
            >
                <motion.img
                    src="https://i.ibb.co/bMjcxJJr/1-YWUpn-Y-z-Nb-Sf-K62-GSJIBbw.png"
                    alt="404 Not Found"
                    className="w-72 mx-auto mb-6 transition-all duration-300"
                    style={{ animation: 'floating 4s ease-in-out infinite' }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileInView={{
                        y: [0, -20, 0], // The jumping animation
                        transition: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                />
                
                <motion.h1
                    className="text-7xl font-extrabold text-red-600 mb-4 drop-shadow-md flex justify-center space-x-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {"404".split('').map((char, index) => (
                        <motion.span key={index} variants={charVariants}>{char}</motion.span>
                    ))}
                </motion.h1>

                <motion.h2
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ ...textVariants.visible.transition, delay: 1 }}
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    className="text-gray-600 dark:text-gray-400 mb-6"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ ...textVariants.visible.transition, delay: 1.2 }}
                >
                    Oops! The page you're looking for doesn't exist or has been moved.
                </motion.p>
                
                <motion.button
                    onClick={() => navigate('/')}
                    className="bg-lime-500 hover:bg-lime-600 text-black font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -5, boxShadow: "0 8px 16px rgba(139, 219, 10, 0.4)" }}
                    whileTap={{ scale: 0.95, rotate: 0 }}
                >
                    Go to Home
                </motion.button>
            </motion.div>
        </div>
    );
}

export default NotFound;
