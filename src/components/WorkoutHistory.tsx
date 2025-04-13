
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkoutStore } from "@/lib/workout-store";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const WorkoutHistory = () => {
  const { workoutHistory, deleteWorkout } = useWorkoutStore();
  
  if (workoutHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No workouts completed yet. Start your fitness journey today!
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleDelete = (date: string) => {
    deleteWorkout(date);
    toast.success("Workout deleted successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {workoutHistory.slice(0, 5).map((workout, index) => (
            <div key={index} className="flex items-start p-4">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-iron-100">
                <CalendarIcon className="h-5 w-5 text-iron-700" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-medium">Workout {workout.type}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {format(parseISO(workout.date), "MMM d, yyyy")}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-red-500"
                      onClick={() => handleDelete(workout.date)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  {workout.exercises.map((exercise, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{exercise.name}</span>
                      <span className="font-medium">{exercise.weight} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutHistory;
