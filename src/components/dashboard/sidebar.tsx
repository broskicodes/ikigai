import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Goal, GoalStatus } from "@/lib/types";
import { Button } from "../ui/button";
import { GoalUpdateModal } from "./goal-update-modal";

interface SidebarProps {
  goals: Goal[];
  handleClick: (goal: Goal) => void;
}

export function Sidebar({ goals, handleClick }: SidebarProps) {
  return (
    <div className="w-64 bg-background overflow-y-auto">
      {goals.map((goal) => (
        <Card
          key={goal.id}
          className="mb-4 cursor-pointer"
          onClick={() => handleClick(goal)}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">{goal.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Progress
              value={
                ((goal.progress ? goal.progress[goal.progress.length - 1] : 0) /
                  goal.target) *
                100
              }
              className="mb-4"
            />
            <div className="flex justify-between items-center">
            <Badge
              variant={
                goal.status === GoalStatus.TO_DO
                  ? "secondary"
                  : goal.status === GoalStatus.IN_PROGRESS
                    ? "default"
                    : goal.status === GoalStatus.ARCHIVED
                    ? "outline"
                    : "accent"
              }
            >
              {goal.status}
            </Badge>
            <GoalUpdateModal 
            goal={goal}
            trigger={<Button
                size="sm"
                variant="secondary"
              >
                Edit
              </Button>} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
