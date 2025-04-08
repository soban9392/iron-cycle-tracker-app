
import { useEffect } from "react";
import { useWorkoutStore } from "@/lib/workout-store";
import WorkoutCard from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const WorkoutPage = () => {
  const { currentWorkout, createNewWorkout } = useWorkoutStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If no current workout, create one if the user directly navigates to this page
    if (!currentWorkout) {
      createNewWorkout();
    }
  }, [currentWorkout, createNewWorkout]);
  
  if (!currentWorkout) {
    return (
      <div className="container max-w-md mx-auto px-4 py-8 pb-16 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Button 
            onClick={() => {
              createNewWorkout();
            }}
            className="bg-iron-700 hover:bg-iron-800"
          >
            <Dumbbell className="mr-2 h-5 w-5" /> Start New Workout
          </Button>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8 pb-16">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Dumbbell className="mr-2 h-6 w-6 text-iron-700" />
        Workout {currentWorkout.type}
      </h1>
      <WorkoutCard workout={currentWorkout} />
      <Navigation />
    </div>
  );
};

export default WorkoutPage;
