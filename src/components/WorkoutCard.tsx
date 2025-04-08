
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Workout } from "@/types/workout";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ExerciseItem from "./ExerciseItem";
import { useWorkoutStore } from "@/lib/workout-store";
import { useToast } from "@/components/ui/use-toast";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const { completeWorkout } = useWorkoutStore();
  const { toast } = useToast();
  
  const allExercisesCompleted = workout.exercises.every(ex => ex.completed);
  
  const handleComplete = () => {
    completeWorkout();
    toast({
      title: "Workout completed!",
      description: `You've completed your Workout ${workout.type} for today.`,
    });
  };

  return (
    <Card className="workout-card mb-4 border-l-4 border-l-iron-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Dumbbell className="mr-2 h-5 w-5 text-iron-700" />
            <CardTitle>Workout {workout.type}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-iron-100 text-iron-800">
            {format(new Date(workout.date), "MMMM d, yyyy")}
          </Badge>
        </div>
        <CardDescription>
          Complete all exercises to finish your workout
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Exercises</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="h-8 px-2"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        {expanded && (
          <div className="space-y-3">
            {workout.exercises.map((exercise) => (
              <ExerciseItem key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleComplete} 
          className="w-full bg-iron-700 hover:bg-iron-800"
          disabled={!allExercisesCompleted}
        >
          <Check className="mr-2 h-4 w-4" /> Complete Workout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
