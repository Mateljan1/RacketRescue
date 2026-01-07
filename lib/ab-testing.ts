// Server-side A/B testing with Vercel Edge Config
// Supports variant assignment, persistence, and analytics tracking

import { analytics } from "./analytics"

export interface Experiment {
  id: string
  name: string
  variants: {
    id: string
    name: string
    weight: number // 0-100
  }[]
  enabled: boolean
}

export interface ExperimentAssignment {
  experimentId: string
  variantId: string
}

// Client-side: Get assigned variant from cookie
export function getVariant(experimentId: string): string | null {
  if (typeof document === "undefined") return null

  const cookies = document.cookie.split(";")
  const experimentCookie = cookies.find((c) => c.trim().startsWith(`exp_${experimentId}=`))

  if (!experimentCookie) return null

  return experimentCookie.split("=")[1] || null
}

// Client-side: Track experiment exposure
export function trackExperimentView(experimentId: string, variantId: string): void {
  analytics.experimentViewed(experimentId, variantId)
}

// Server-side: Assign variant (called from middleware)
export function assignVariant(experiment: Experiment): string {
  const random = Math.random() * 100
  let cumulative = 0

  for (const variant of experiment.variants) {
    cumulative += variant.weight
    if (random <= cumulative) {
      return variant.id
    }
  }

  // Fallback to control
  return experiment.variants[0].id
}

// Server-side: Get experiment config from Edge Config
export async function getExperiment(experimentId: string): Promise<Experiment | null> {
  try {
    // Check if Edge Config is configured BEFORE importing the module
    if (!process.env.EDGE_CONFIG) {
      // Edge Config not configured - A/B testing disabled silently
      return null
    }

    // Dynamic import only when EDGE_CONFIG is available
    const { get } = await import("@vercel/edge-config")
    const experiment = await get<Experiment>(`experiments.${experimentId}`)
    return experiment || null
  } catch (error) {
    // Silently fail if Edge Config is not available
    return null
  }
}
