
import WorkoutHistory from "@/components/WorkoutHistory";
import { History } from "lucide-react";
import Navigation from "@/components/Navigation";

const HistoryPage = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-8 pb-16">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <History className="mr-2 h-6 w-6 text-iron-700" />
        Workout History
      </h1>
      
      <WorkoutHistory />
      
      <Navigation />
    </div>
  );
};

export default HistoryPage;
