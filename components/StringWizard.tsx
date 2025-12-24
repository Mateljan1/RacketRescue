'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Sparkles, Check, Info } from 'lucide-react'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelectString?: (stringId: string, stringName: string, stringPrice: number) => void
}

const questions = [
  {
    id: 'level',
    question: 'What\'s your playing level?',
    options: [
      { value: 'beginner', label: 'Beginner', subtitle: '0-2 years playing' },
      { value: 'intermediate', label: 'Intermediate', subtitle: 'Club player, 3.0-4.0' },
      { value: 'advanced', label: 'Advanced', subtitle: 'Tournament player, 4.5+' },
      { value: 'pro', label: 'Professional', subtitle: 'Teaching pro or tour player' },
    ],
  },
  {
    id: 'style',
    question: 'What\'s your playing style?',
    options: [
      { value: 'baseline', label: 'Baseline Grinder', subtitle: 'Heavy topspin, long rallies' },
      { value: 'aggressive', label: 'Aggressive Baseliner', subtitle: 'Big groundstrokes, flat shots' },
      { value: 'all_court', label: 'All-Court', subtitle: 'Mix it up, come to net' },
      { value: 'serve_volley', label: 'Serve & Volley', subtitle: 'Classic net player' },
    ],
  },
  {
    id: 'priority',
    question: 'What\'s most important to you?',
    options: [
      { value: 'spin', label: 'Maximum Spin', subtitle: 'Heavy topspin and control' },
      { value: 'power', label: 'Power', subtitle: 'Effortless depth and pace' },
      { value: 'control', label: 'Control', subtitle: 'Precision and feel' },
      { value: 'comfort', label: 'Comfort', subtitle: 'Arm-friendly, reduces shock' },
      { value: 'durability', label: 'Durability', subtitle: 'Long-lasting strings' },
    ],
  },
  {
    id: 'arm',
    question: 'Any arm or shoulder issues?',
    options: [
      { value: 'none', label: 'No Issues', subtitle: 'Feeling great' },
      { value: 'minor', label: 'Minor Discomfort', subtitle: 'Occasional soreness' },
      { value: 'chronic', label: 'Chronic Pain', subtitle: 'Need arm-friendly options' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your string budget?',
    options: [
      { value: 'value', label: 'Value', subtitle: '$15-20 per string' },
      { value: 'mid', label: 'Mid-Range', subtitle: '$20-28 per string' },
      { value: 'premium', label: 'Premium', subtitle: '$28-35 per string' },
      { value: 'no_limit', label: 'Best Available', subtitle: 'Performance over price' },
    ],
  },
]

const stringRecommendations = {
  spin_advanced: {
    id: 'rpm_blast',
    name: 'Babolat RPM Blast',
    price: 22,
    type: 'Polyester',
    why: 'Maximum spin potential for aggressive baseliners. Tour-level control and bite on the ball.',
    tags: ['Spin', 'Control', 'Durability'],
  },
  power_intermediate: {
    id: 'velocity',
    name: 'Wilson Velocity MLT',
    price: 18,
    type: 'Multifilament',
    why: 'Perfect balance of power and comfort for intermediate players. Great feel and easy depth.',
    tags: ['Power', 'Comfort', 'Value'],
  },
  comfort_all: {
    id: 'nxt',
    name: 'Wilson NXT',
    price: 20,
    type: 'Multifilament',
    why: 'The most arm-friendly string available. Soft feel without sacrificing performance.',
    tags: ['Comfort', 'Power', 'Feel'],
  },
  control_advanced: {
    id: 'luxilon_alu',
    name: 'Luxilon ALU Power',
    price: 25,
    type: 'Polyester',
    why: 'Tour pro favorite. Ultimate control and precision for advanced players.',
    tags: ['Control', 'Spin', 'Pro'],
  },
  value_all: {
    id: 'hyper_g',
    name: 'Solinco Hyper-G',
    price: 18,
    type: 'Polyester',
    why: 'Best value poly string. Great spin and durability at an affordable price.',
    tags: ['Spin', 'Durability', 'Value'],
  },
}

export default function StringWizard({ isOpen, onClose, onSelectString }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const getRecommendation = () => {
    // Simple recommendation logic based on answers
    if (answers.arm === 'chronic' || answers.arm === 'minor') {
      return stringRecommendations.comfort_all
    }
    if (answers.priority === 'spin' && (answers.level === 'advanced' || answers.level === 'pro')) {
      return stringRecommendations.spin_advanced
    }
    if (answers.priority === 'control' && answers.level === 'advanced') {
      return stringRecommendations.control_advanced
    }
    if (answers.budget === 'value') {
      return stringRecommendations.value_all
    }
    return stringRecommendations.power_intermediate
  }

  const resetWizard = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  if (!isOpen) return null

  const recommendation = getRecommendation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-racket-orange to-orange-500 text-white p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h2 className="text-3xl font-bold">String Wizard</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/90 text-lg">
            Answer 5 quick questions to find your perfect string
          </p>

          {/* Progress */}
          {!showResults && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  className="h-full bg-white rounded-full"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-racket-black mb-8">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                      className="w-full text-left p-6 bg-gray-50 hover:bg-racket-orange/10 border-2 border-gray-200 hover:border-racket-orange rounded-2xl transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-racket-black mb-1 group-hover:text-racket-orange transition-colors">
                            {option.label}
                          </div>
                          <div className="text-racket-gray">{option.subtitle}</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-racket-gray group-hover:text-racket-orange transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="mt-6 flex items-center gap-2 text-racket-gray hover:text-racket-black transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex p-6 bg-racket-green/20 rounded-full mb-8"
                >
                  <Check className="w-16 h-16 text-racket-green" />
                </motion.div>

                <h3 className="text-4xl font-bold text-racket-black mb-4">
                  Perfect Match Found!
                </h3>
                <p className="text-xl text-racket-gray mb-12">
                  Based on your answers, we recommend:
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-racket-red/10 to-racket-orange/10 border-4 border-racket-red rounded-3xl p-10 mb-8"
                >
                  <div className="text-center mb-6">
                    <h4 className="text-3xl font-bold text-racket-black mb-2">
                      {recommendation.name}
                    </h4>
                    <div className="text-5xl font-bold text-racket-red mb-3">
                      ${recommendation.price}
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full">
                      <span className="text-sm font-bold text-racket-gray">{recommendation.type}</span>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-racket-blue flex-shrink-0 mt-1" />
                      <div className="text-left">
                        <h5 className="font-bold text-racket-black mb-2">Why this string?</h5>
                        <p className="text-racket-gray leading-relaxed">
                          {recommendation.why}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    {recommendation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-racket-red/10 text-racket-red px-4 py-2 rounded-full font-bold"
                      >
                        <Check className="w-4 h-4" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (onSelectString) {
                        onSelectString(recommendation.id, recommendation.name, recommendation.price)
                      }
                      onClose()
                    }}
                    className="flex-1 bg-racket-red text-white py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    Select This String
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetWizard}
                    className="flex-1 bg-gray-200 text-racket-black py-5 rounded-full text-lg font-bold hover:bg-gray-300 transition-colors"
                  >
                    Start Over
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

