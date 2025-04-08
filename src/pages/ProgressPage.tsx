
import { useWorkoutStore } from "@/lib/workout-store";
import ProgressChart from "@/components/ProgressChart";
import { BarChart } from "lucide-react";
import Navigation from "@/components/Navigation";

const ProgressPage = () => {
  const { workoutHistory } = useWorkoutStore();
  
  return (
    <div className="container max-w-md mx-auto px-4 py-8 pb-16">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <BarChart className="mr-2 h-6 w-6 text-iron-700" />
        Your Progress
      </h1>
      
      {workoutHistory.length === 0 ? (
        <div className="bg-iron-50 rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium mb-2">No progress data yet</h2>
          <p className="text-muted-foreground">
            Complete your first workout to start tracking your progress.
          </p>
        </div>
      ) : (
        <ProgressChart />
      )}
      
      <Navigation />
    </div>
  );
};

export default ProgressPage;
