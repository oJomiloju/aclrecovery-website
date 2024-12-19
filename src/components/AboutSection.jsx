import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  // Animation settings
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-left">
          About Motion 90°
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          Motion 90° is your trusted partner in ACL recovery. Our platform
          offers personalized exercises, progress tracking, and expert guidance,
          empowering you to take control of your recovery journey. We focus on
          helping you rebuild strength, improve mobility, and achieve your goals
          step by step.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Feature 1 */}
          <motion.div
            className="mb-8"
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-black">
              Personalized Progress Tracking
            </h3>
            <p className="text-lg text-gray-700 mt-2">
              Upload your recovery metrics and visualize your progress with dynamic
              graphs that track your journey over time.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="mb-8"
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-black">
              Tailored Exercises
            </h3>
            <p className="text-lg text-gray-700 mt-2">
              Receive exercises designed for your recovery stage, ensuring a safe
              and effective path to regaining mobility and strength.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="mb-8"
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-black">
              Educational Resources
            </h3>
            <p className="text-lg text-gray-700 mt-2">
              Access trusted articles and tips to better understand your ACL recovery
              phases and stay motivated throughout the process.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className="mb-8"
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-black">
              Set Recovery Goals
            </h3>
            <p className="text-lg text-gray-700 mt-2">
              Set short-term and long-term goals to track your progress and ensure
              you stay on schedule toward full recovery.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

