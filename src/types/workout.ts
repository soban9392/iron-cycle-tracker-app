
export type WorkoutType = 'A' | 'B';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
}

export interface WorkoutExercise extends Exercise {
  weight: number;
  completed: boolean;
}

export interface Workout {
  id: string;
  type: WorkoutType;
  date: string;
  exercises: WorkoutExercise[];
  completed: boolean;
}

export interface WorkoutHistory {
  date: string;
  type: WorkoutType;
  exercises: {
    name: string;
    weight: number;
    sets: number;
    reps: number;
  }[];
}
