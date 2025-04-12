
import WorkoutHistory from "@/components/WorkoutHistory";
import { History, LogOut } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useCapacitorApp } from "@/hooks/use-capacitor";
import { App } from "@capacitor/app";
import { toast } from "sonner";

const HistoryPage = () => {
  const { isCapacitor } = useCapacitorApp();

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
          <History className="mr-2 h-6 w-6 text-iron-700" />
          Workout History
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
      
      <WorkoutHistory />
      
      <Navigation />
    </div>
  );
};

export default HistoryPage;
