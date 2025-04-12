
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkoutExercise } from "@/types/workout";
import { useWorkoutStore } from "@/lib/workout-store";

interface ExerciseItemProps {
  exercise: WorkoutExercise;
}

const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
  const { updateExerciseWeight, toggleExerciseCompleted } = useWorkoutStore();
  const [localWeight, setLocalWeight] = useState(exercise.weight.toString());
  
  const handleWeightChange = (value: string) => {
    setLocalWeight(value);
    const numValue = parseFloat(value) || 0;
    updateExerciseWeight(exercise.id, numValue);
  };

  return (
    <Card className="exercise-card overflow-hidden border-l-4 border-l-iron-500">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-1.5">
            <div className="font-medium">
              {exercise.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {exercise.sets} sets × {exercise.reps} reps
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor={`weight-${exercise.id}`} className="sr-only">Weight</Label>
            <div className="relative">
              <Input
                id={`weight-${exercise.id}`}
                type="number"
                value={localWeight}
                onChange={(e) => handleWeightChange(e.target.value)}
                className="w-20 text-right pr-7"
                min="0"
                step="2.5"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                kg
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseItem;
