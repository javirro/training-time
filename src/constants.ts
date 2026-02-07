export const TRAINING_TYPES = ['AMRAP', 'TABATA', 'EMOM', 'TIMEKEEPER'] as const

export type TrainingType = (typeof TRAINING_TYPES)[number]

export const trainingDescriptions: Record<TrainingType, string> = {
  AMRAP: 'As Many Rounds As Possible - Complete as many rounds of the given exercises within the time limit.',
  TABATA: 'Workd and Rest Intervals. For example, 20 seconds of work followed by 10 seconds of rest, repeated for a set number of rounds.',
  EMOM: 'Every Minute On the Minute - Perform a specific exercise at the start of every minute for a set duration.',
  TIMEKEEPER: 'A simple timer to track your workout duration without specific intervals or rounds.'
}
