import React from "react";
import { motion } from "framer-motion";

const GetStartedSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-r from-blue-100 to-white py-16 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
          Ready to Start Your Recovery Journey?
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Take control of your progress with Motion 90°. Join now and get access
          to personalized exercises, progress tracking, and expert guidance for
          a smooth ACL recovery.
        </p>

        {/* Button */}
        <button className="px-8 py-4 bg-[#294C3A] text-white font-bold text-lg rounded-full hover:bg-[#1E3B2B] transition duration-300">
          Get Started
        </button>
      </div>
    </motion.section>
  );
};

export default GetStartedSection;
