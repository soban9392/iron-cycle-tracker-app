
import { Button } from "@/components/ui/button";
import { Dumbbell, BarChart, History, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-10">
      <Button 
        variant={isActive('/') ? "default" : "ghost"} 
        className={isActive('/') ? "bg-iron-700" : ""} 
        size="sm"
        onClick={() => navigate('/')}
      >
        <Home className="h-5 w-5 mr-1" />
        <span className="text-xs">Home</span>
      </Button>
      
      <Button 
        variant={isActive('/workout') ? "default" : "ghost"} 
        className={isActive('/workout') ? "bg-iron-700" : ""} 
        size="sm"
        onClick={() => navigate('/workout')}
      >
        <Dumbbell className="h-5 w-5 mr-1" />
        <span className="text-xs">Workout</span>
      </Button>
      
      <Button 
        variant={isActive('/progress') ? "default" : "ghost"} 
        className={isActive('/progress') ? "bg-iron-700" : ""} 
        size="sm"
        onClick={() => navigate('/progress')}
      >
        <BarChart className="h-5 w-5 mr-1" />
        <span className="text-xs">Progress</span>
      </Button>
      
      <Button 
        variant={isActive('/history') ? "default" : "ghost"} 
        className={isActive('/history') ? "bg-iron-700" : ""} 
        size="sm"
        onClick={() => navigate('/history')}
      >
        <History className="h-5 w-5 mr-1" />
        <span className="text-xs">History</span>
      </Button>
    </div>
  );
};

export default Navigation;
