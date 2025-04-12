
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, LogOut } from "lucide-react";
import { useWorkoutStore } from "@/lib/workout-store";
import { Button } from "@/components/ui/button";
import WorkoutCard from "@/components/WorkoutCard";
import Navigation from "@/components/Navigation";
import { DatePicker } from "@/components/DatePicker";
import { toast } from "sonner";
import { useCapacitorApp } from "@/hooks/use-capacitor";
import { App } from "@capacitor/app";

const WorkoutPage = () => {
  const navigate = useNavigate();
  const [workoutDate, setWorkoutDate] = useState<Date>(new Date());
  const { isCapacitor } = useCapacitorApp();
  
  const { 
    currentWorkout, 
    createNewWorkout, 
    createWorkoutForDate,
    completeWorkout 
  } = useWorkoutStore();

  useEffect(() => {
    if (!currentWorkout) {
      createWorkoutForDate(workoutDate);
    }
  }, [currentWorkout, createWorkoutForDate, workoutDate]);

  const handleStartWorkout = () => {
    if (!currentWorkout) {
      createWorkoutForDate(workoutDate);
    }
  };

  const handleCompleteWorkout = () => {
    completeWorkout();
    toast.success("Workout completed! 💪");
    navigate("/");
  };

  const handleDateChange = (date: Date) => {
    setWorkoutDate(date);
    if (currentWorkout) {
      completeWorkout();
    }
    createWorkoutForDate(date);
  };

  const handleExitApp = () => {
    if (isCapacitor) {
      App.exitApp();
    } else {
      toast.info("This function only works on mobile devices");
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8 pb-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Dumbbell className="mr-2 h-6 w-6 text-iron-700" />
          Current Workout
        </h1>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleExitApp}
          className="text-red-500"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-medium mb-2">Workout Date</h2>
        <DatePicker date={workoutDate} setDate={handleDateChange} />
      </div>
      
      {currentWorkout && (
        <div className="space-y-4">
          <WorkoutCard workout={currentWorkout} />
          <Button 
            onClick={handleCompleteWorkout} 
            className="w-full bg-iron-700 hover:bg-iron-800"
          >
            Complete Workout
          </Button>
        </div>
      )}
      
      {!currentWorkout && (
        <div className="text-center py-8">
          <p className="mb-4 text-muted-foreground">No active workout. Start one now!</p>
          <Button onClick={handleStartWorkout}>Start Workout</Button>
        </div>
      )}
      
      <Navigation />
    </div>
  );
};

export default WorkoutPage;
