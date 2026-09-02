"use client";

import { motion } from "framer-motion";
import { TransitionFrame } from "./shared";

/** An old map unfolds, a compass settles on a bearing, an ink route draws itself across the page. */
export function AdventureTransition({ label }: { label: string }) {
  return (
    <TransitionFrame
      background="bg-gradient-to-br from-[#EDE0C4] via-[#E4D3AC] to-[#D8C495]"
      label={label}
      labelClassName="text-ink"
    >
      <motion.div
        aria-hidden="true"
        className="relative h-[260px] w-[340px] rounded-md border border-ink/15 bg-[#F3E9D2] shadow-lift sm:h-[300px] sm:w-[400px]"
        initial={{ scaleX: 0.12, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 200 150" className="h-full w-full p-6" fill="none">
          <motion.path
            d="M20,120 C40,100 55,60 90,55 C120,50 130,20 165,15"
            stroke="#8B5E34"
            strokeWidth={1.6}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeInOut" }}
          />
          <motion.circle
            cx={165}
            cy={15}
            r={4}
            fill="#8B5E34"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.15, duration: 0.25 }}
          />
        </svg>
      </motion.div>

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 60 60"
        className="absolute top-[18%] left-1/2 h-16 w-16 -translate-x-1/2 drop-shadow-md sm:h-20 sm:w-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <circle cx={30} cy={30} r={26} fill="#F3E9D2" stroke="#8B5E34" strokeWidth={2} />
        <g transform="translate(30,30)">
          <motion.g
            style={{ transformOrigin: "0px 0px" }}
            initial={{ rotate: -30 }}
            animate={{ rotate: [-30, 200, 130, 160] }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeInOut" }}
          >
            <path d="M0 -20 L4 0 L0 20 L-4 0 Z" fill="#B33F2E" />
          </motion.g>
        </g>
      </motion.svg>
    </TransitionFrame>
  );
}
