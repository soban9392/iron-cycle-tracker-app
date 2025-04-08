
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Exercise, Workout, WorkoutHistory, WorkoutType } from '@/types/workout';

const WORKOUT_A: Exercise[] = [
  { id: '1', name: 'Squat', sets: 3, reps: 5 },
  { id: '2', name: 'Shoulder Press', sets: 3, reps: 5 },
  { id: '3', name: 'Deadlift', sets: 1, reps: 5 }
];

const WORKOUT_B: Exercise[] = [
  { id: '1', name: 'Squat', sets: 3, reps: 5 },
  { id: '2', name: 'Bench Press', sets: 3, reps: 5 },
  { id: '3', name: 'Deadlift', sets: 1, reps: 5 }
];

interface WorkoutState {
  currentWorkout: Workout | null;
  workoutHistory: WorkoutHistory[];
  nextWorkoutType: WorkoutType;
  createNewWorkout: () => void;
  updateExerciseWeight: (exerciseId: string, weight: number) => void;
  toggleExerciseCompleted: (exerciseId: string) => void;
  completeWorkout: () => void;
  getExerciseHistory: (exerciseName: string) => { date: string; weight: number }[];
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentWorkout: null,
      workoutHistory: [],
      nextWorkoutType: 'A',

      createNewWorkout: () => {
        const { nextWorkoutType } = get();
        const exercises = nextWorkoutType === 'A' ? WORKOUT_A : WORKOUT_B;
        
        // Get last weights from history for each exercise if available
        const workoutExercises = exercises.map(exercise => {
          const history = get().getExerciseHistory(exercise.name);
          const lastWeight = history.length > 0 ? history[0].weight : 0;
          
          return {
            ...exercise,
            weight: lastWeight,
            completed: false
          };
        });

        set({
          currentWorkout: {
            id: uuidv4(),
            type: nextWorkoutType,
            date: new Date().toISOString(),
            exercises: workoutExercises,
            completed: false
          }
        });
      },

      updateExerciseWeight: (exerciseId, weight) => {
        set(state => {
          if (!state.currentWorkout) return state;
          
          const updatedExercises = state.currentWorkout.exercises.map(exercise => 
            exercise.id === exerciseId ? { ...exercise, weight } : exercise
          );
          
          return { 
            currentWorkout: { 
              ...state.currentWorkout, 
              exercises: updatedExercises 
            } 
          };
        });
      },

      toggleExerciseCompleted: (exerciseId) => {
        set(state => {
          if (!state.currentWorkout) return state;
          
          const updatedExercises = state.currentWorkout.exercises.map(exercise => 
            exercise.id === exerciseId ? { ...exercise, completed: !exercise.completed } : exercise
          );
          
          return { 
            currentWorkout: { 
              ...state.currentWorkout, 
              exercises: updatedExercises 
            } 
          };
        });
      },

      completeWorkout: () => {
        const { currentWorkout } = get();
        if (!currentWorkout) return;

        // Add to history
        const historyEntry: WorkoutHistory = {
          date: currentWorkout.date,
          type: currentWorkout.type,
          exercises: currentWorkout.exercises.map(exercise => ({
            name: exercise.name,
            weight: exercise.weight,
            sets: exercise.sets,
            reps: exercise.reps
          }))
        };

        set(state => ({
          currentWorkout: null,
          workoutHistory: [historyEntry, ...state.workoutHistory],
          nextWorkoutType: state.nextWorkoutType === 'A' ? 'B' : 'A'
        }));
      },

      getExerciseHistory: (exerciseName) => {
        const { workoutHistory } = get();
        
        return workoutHistory
          .flatMap(workout => 
            workout.exercises
              .filter(exercise => exercise.name === exerciseName)
              .map(exercise => ({
                date: workout.date,
                weight: exercise.weight
              }))
          )
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    }),
    {
      name: 'iron-workout-storage'
    }
  )
);
