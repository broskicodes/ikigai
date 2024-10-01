import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal, GraphData } from "@/lib/types";
import { Line } from "react-chartjs-2";

interface ChartProps {
  selectedGoal: Goal | null;
  graphData: GraphData | null;
}

export function Chart({ selectedGoal, graphData }: ChartProps) {
  return (
    <div className="flex-1 bg-background">
      {graphData && selectedGoal && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{selectedGoal.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: "400px" }}>
              <Line
                data={graphData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: Math.floor(selectedGoal.target * 1.1),
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
