"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { CONSOLE_API_URL } from "@/lib/constants";
import { useAuth } from "@/providers/auth-provider";
import { Goal, GraphData } from "@/lib/types";
import { Chart } from "@/components/dashboard/chart";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/lp/header";
import { Footer } from "@/components/lp/footer";
import { GoalModal } from "@/components/dashboard/goal_modal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  const { user } = useAuth();

  const handleGoalClick = useCallback((goal: Goal) => {
    setSelectedGoal(goal);
  }, []);

  useEffect(() => {
    if (!selectedGoal) return;

    const newData: GraphData = {
      labels:
        selectedGoal.progress?.map((_, index) => `Day ${index + 1}`) || [],
      datasets: [
        {
          label: `Progress for ${selectedGoal.name}`,
          data: selectedGoal.progress || [],
          borderColor: "rgb(226, 113, 90)",
          tension: 0.1,
        },
      ],
    };

    setGraphData(newData);
  }, [selectedGoal]);

  useEffect(() => {
    if (!user) return;

    // Fetch goals from the API
    fetch(`${CONSOLE_API_URL}/goals/`, {
      method: "GET",
      headers: {
        "user-id": user.id,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let goals: Goal[] = [];
        data.map(([goal, progress_data]: [Goal, any[]]) => {
          goals.push({
            ...goal,
            progress: progress_data.map((elem: any) => elem.progress),
          });
        });

        setGoals(goals);
      })
      .catch((error) => console.error("Error fetching goals:", error));
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <main className="flex-1 flex flex-col h-screen w-full bg-background">
        <Header />
        <div className="flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-4">Goals</h2>
        <div className="flex flex-row space-x-6">
          <Sidebar goals={goals} handleClick={handleGoalClick} />
          <Chart selectedGoal={selectedGoal} graphData={graphData} />
        </div>
        <div className="flex flex-row">
            <GoalModal />
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
