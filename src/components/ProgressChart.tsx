
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useWorkoutStore } from "@/lib/workout-store";

const exerciseNames = ["Squat", "Bench Press", "Shoulder Press", "Deadlift"];

const ProgressChart = () => {
  const { getExerciseHistory } = useWorkoutStore();

  const formatChartData = (exerciseName: string) => {
    const history = getExerciseHistory(exerciseName);
    
    // Take only the last 10 entries (most recent first)
    return history.slice(0, 10).reverse().map(entry => ({
      date: format(parseISO(entry.date), "MMM d"),
      weight: entry.weight
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-iron-800">Your Progress</CardTitle>
        <CardDescription>
          Track your strength gains over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Squat">
          <TabsList className="mb-4 w-full">
            {exerciseNames.map(name => (
              <TabsTrigger key={name} value={name} className="flex-1">
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {exerciseNames.map(name => (
            <TabsContent key={name} value={name}>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formatChartData(name)}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} kg`, 'Weight']}
                      labelFormatter={(date) => `Date: ${date}`}
                    />
                    <Bar 
                      dataKey="weight" 
                      fill="#4f649d" 
                      name="Weight (kg)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
