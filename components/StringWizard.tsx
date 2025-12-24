'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Sparkles, Check, Info, Star } from 'lucide-react'
import { useState } from 'react'
import { recommendStrings, STRINGS_CATALOG } from '@/lib/strings-catalog'

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
    id: 'priority',
    question: 'What\'s most important to you?',
    options: [
      { value: 'spin', label: 'Maximum Spin', subtitle: 'Heavy topspin and control' },
      { value: 'power', label: 'Power', subtitle: 'Effortless depth and pace' },
      { value: 'control', label: 'Control', subtitle: 'Precision and feel' },
      { value: 'comfort', label: 'Comfort', subtitle: 'Arm-friendly, reduces shock' },
    ],
  },
  {
    id: 'arm_issues',
    question: 'Any arm or shoulder issues?',
    options: [
      { value: 'false', label: 'No Issues', subtitle: 'Feeling great' },
      { value: 'true', label: 'Yes, Need Comfort', subtitle: 'Arm-friendly strings please' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your string budget?',
    options: [
      { value: 'value', label: 'Value', subtitle: '$15-20 per string' },
      { value: 'mid', label: 'Mid-Range', subtitle: '$20-28 per string' },
      { value: 'premium', label: 'Premium', subtitle: '$28+ per string' },
    ],
  },
]

export default function StringWizard({ isOpen, onClose, onSelectString }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      // Get recommendations from catalog
      const profile = {
        level: newAnswers.level,
        priority: newAnswers.priority,
        arm_issues: newAnswers.arm_issues === 'true',
        budget: newAnswers.budget,
      }
      const recommended = recommendStrings(profile)
      setRecommendations(recommended)
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const resetWizard = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setRecommendations([])
  }

  const handleClose = () => {
    resetWizard()
    onClose()
  }

  if (!isOpen) return null

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
                  Your Perfect Matches!
                </h3>
                <p className="text-xl text-racket-gray mb-8">
                  Based on your answers, we recommend these strings:
                </p>

                {/* Show Top 3 Recommendations */}
                <div className="space-y-4 mb-8">
                  {recommendations.map((string, i) => (
                    <motion.div
                      key={string.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="bg-white border-4 border-gray-200 hover:border-racket-red rounded-2xl p-6 text-left cursor-pointer transition-all"
                      onClick={() => {
                        if (onSelectString) {
                          onSelectString(string.id, `${string.brand} ${string.name}`, string.price)
                        }
                        handleClose()
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {i === 0 && (
                              <span className="bg-racket-green text-white text-xs px-3 py-1 rounded-full font-bold">
                                ★ TOP PICK
                              </span>
                            )}
                            <span className="text-xs font-bold text-racket-gray uppercase">
                              {string.brand}
                            </span>
                          </div>
                          <h4 className="text-2xl font-black text-racket-black mb-2">
                            {string.name}
                          </h4>
                          <p className="text-sm text-racket-gray mb-3">
                            {string.description}
                          </p>
                          
                          {/* Characteristics Bar */}
                          <div className="flex gap-2 text-xs mb-3">
                            <div className="flex items-center gap-1">
                              <span className="text-racket-gray">Power:</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, j) => (
                                  <div
                                    key={j}
                                    className={`w-2 h-2 rounded-full ${
                                      j < string.characteristics.power ? 'bg-racket-red' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-racket-gray">Control:</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, j) => (
                                  <div
                                    key={j}
                                    className={`w-2 h-2 rounded-full ${
                                      j < string.characteristics.control ? 'bg-racket-blue' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-racket-gray">Comfort:</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, j) => (
                                  <div
                                    key={j}
                                    className={`w-2 h-2 rounded-full ${
                                      j < string.characteristics.comfort ? 'bg-racket-green' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Reviews */}
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-racket-orange fill-current" />
                            <span className="font-bold text-racket-black">{string.rating}</span>
                            <span className="text-racket-gray">({string.reviews}+ reviews)</span>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-4xl font-black text-racket-red mb-2">
                            ${string.price}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-racket-red text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-red-600 transition-colors"
                          >
                            Select
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetWizard}
                  className="w-full bg-gray-200 text-racket-black py-4 rounded-full text-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  Start Over
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

