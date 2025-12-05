import React from 'react';
import { motion } from 'framer-motion';

const MarqueeTags = ({ tags, direction = 'left', speed = 20 }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap mask-gradient w-full py-2">
      <motion.div
        className="flex gap-3"
        initial={{ x: direction === 'left' ? 0 : -1000 }}
        animate={{ x: direction === 'left' ? -1000 : 0 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {[...tags, ...tags, ...tags, ...tags].map((tag, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeTags;