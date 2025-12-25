'use client'

import { motion } from 'framer-motion'

// CUSTOM ILLUSTRATIONS - NO GENERIC ICONS!

export const TimeSavingsIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
    <defs>
      <linearGradient id="timeSavingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec1f27" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ec1f27" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    
    {/* Background circle */}
    <circle cx="60" cy="60" r="55" fill="url(#timeSavingsGrad)" />
    
    {/* Clock face - custom design */}
    <circle cx="60" cy="60" r="35" fill="none" stroke="#ec1f27" strokeWidth="3" />
    
    {/* Hour markers */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const radian = (angle * Math.PI) / 180
        const x1 = 60 + 30 * Math.cos(radian)
        const y1 = 60 + 30 * Math.sin(radian)
        const x2 = 60 + 35 * Math.cos(radian)
        const y2 = 60 + 35 * Math.sin(radian)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ec1f27"
            strokeWidth={i % 3 === 0 ? "2" : "1"}
            strokeLinecap="round"
          />
        )
      })}
    </motion.g>
    
    {/* Arrow showing saved time */}
    <motion.path
      d="M 60 60 L 60 35 L 75 50 L 60 35 L 45 50 Z"
      fill="#ec1f27"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    
    {/* "2+" text */}
    <text x="60" y="85" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#ec1f27">
      2+
    </text>
    <text x="60" y="100" textAnchor="middle" fontSize="12" fill="#6b7280">
      hours
    </text>
  </svg>
)

export const PrecisionIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
    <defs>
      <linearGradient id="precisionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec1f27" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ec1f27" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <circle cx="60" cy="60" r="55" fill="url(#precisionGrad)" />
    
    {/* Tension meter design */}
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
    >
      {/* Meter body */}
      <rect x="30" y="40" width="60" height="40" rx="5" fill="none" stroke="#ec1f27" strokeWidth="3" />
      
      {/* Dial */}
      <circle cx="60" cy="60" r="15" fill="none" stroke="#ec1f27" strokeWidth="2" />
      
      {/* Needle */}
      <motion.line
        x1="60"
        y1="60"
        x2="60"
        y2="48"
        stroke="#ec1f27"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ rotate: -45 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ transformOrigin: '60px 60px' }}
      />
      
      {/* Precision marks */}
      {[-30, -15, 0, 15, 30].map((angle, i) => (
        <line
          key={i}
          x1="60"
          y1="45"
          x2="60"
          y2="40"
          stroke="#ec1f27"
          strokeWidth="1"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
    </motion.g>
    
    {/* "0.5 lb" text */}
    <text x="60" y="92" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ec1f27">
      0.5 lb
    </text>
    <text x="60" y="105" textAnchor="middle" fontSize="10" fill="#6b7280">
      accuracy
    </text>
  </svg>
)

export const SpeedIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
    <defs>
      <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec1f27" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ec1f27" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <circle cx="60" cy="60" r="55" fill="url(#speedGrad)" />
    
    {/* Speedometer design */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Arc */}
      <path
        d="M 20 75 A 40 40 0 0 1 100 75"
        fill="none"
        stroke="#ec1f27"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Tick marks */}
      {[0, 20, 40, 60, 80, 100].map((percent, i) => {
        const angle = -180 + (percent * 180) / 100
        const radian = (angle * Math.PI) / 180
        const x1 = 60 + 38 * Math.cos(radian)
        const y1 = 75 + 38 * Math.sin(radian)
        const x2 = 60 + 32 * Math.cos(radian)
        const y2 = 75 + 32 * Math.sin(radian)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ec1f27"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}
      
      {/* Needle */}
      <motion.line
        x1="60"
        y1="75"
        x2="85"
        y2="55"
        stroke="#ec1f27"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ rotate: -90 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
        style={{ transformOrigin: '60px 75px' }}
      />
      
      {/* Center dot */}
      <circle cx="60" cy="75" r="4" fill="#ec1f27" />
    </motion.g>
    
    {/* "2-3" text */}
    <text x="60" y="95" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ec1f27">
      2-3
    </text>
    <text x="60" y="108" textAnchor="middle" fontSize="10" fill="#6b7280">
      days
    </text>
  </svg>
)

