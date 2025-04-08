
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkoutStore } from "@/lib/workout-store";
import { Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  const { currentWorkout, nextWorkoutType, createNewWorkout } = useWorkoutStore();
  const navigate = useNavigate();
  
  const handleStartWorkout = () => {
    if (!currentWorkout) {
      createNewWorkout();
    }
    navigate('/workout');
  };

  return (
    <div className="container max-w-md mx-auto px-4 pb-16">
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold text-iron-900">Iron Cycle</h1>
        <p className="text-muted-foreground mt-2">Track your strength progress</p>
      </div>
      
      <Card className="bg-gradient-to-br from-iron-800 to-iron-950 text-white mb-6">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Dumbbell className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">Up Next</h2>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium">Workout {currentWorkout?.type || nextWorkoutType}</h3>
            <ul className="mt-2 space-y-1">
              {(currentWorkout ? currentWorkout.exercises : 
                nextWorkoutType === 'A' ? 
                  [
                    { name: 'Squat', sets: 3, reps: 5 },
                    { name: 'Shoulder Press', sets: 3, reps: 5 },
                    { name: 'Deadlift', sets: 1, reps: 5 }
                  ] : 
                  [
                    { name: 'Squat', sets: 3, reps: 5 },
                    { name: 'Bench Press', sets: 3, reps: 5 },
                    { name: 'Deadlift', sets: 1, reps: 5 }
                  ]
              ).map((exercise, index) => (
                <li key={index} className="text-sm flex justify-between">
                  <span>{exercise.name}</span>
                  <span>{exercise.sets} × {exercise.reps}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Button 
            onClick={handleStartWorkout} 
            className="w-full bg-white text-iron-900 hover:bg-gray-100"
          >
            {currentWorkout ? "Continue Workout" : "Start Workout"}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Training Plan</h2>
          
          <div className="space-y-4">
            <div className="bg-iron-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Workout A</h3>
              <ul className="text-sm space-y-1">
                <li className="flex justify-between">
                  <span>Squat</span>
                  <span>3 × 5</span>
                </li>
                <li className="flex justify-between">
                  <span>Shoulder Press</span>
                  <span>3 × 5</span>
                </li>
                <li className="flex justify-between">
                  <span>Deadlift</span>
                  <span>1 × 5</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-iron-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Workout B</h3>
              <ul className="text-sm space-y-1">
                <li className="flex justify-between">
                  <span>Squat</span>
                  <span>3 × 5</span>
                </li>
                <li className="flex justify-between">
                  <span>Bench Press</span>
                  <span>3 × 5</span>
                </li>
                <li className="flex justify-between">
                  <span>Deadlift</span>
                  <span>1 × 5</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Navigation />
    </div>
  );
};

export default Index;
