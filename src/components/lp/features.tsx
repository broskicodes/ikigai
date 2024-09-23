import {
  Users,
  PhoneCall,
  CalendarDays,
  Timer,
  GraduationCap,
  Puzzle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      icon: PhoneCall,
      title: "One-on-One Calls",
      description:
        "Schedule calls with mentors to get personalized support and guidance on your goals.",
    },
    {
      icon: CalendarDays,
      title: "Weekly Check-ins",
      description:
        "A weekly checkin with a mentor to track your progress and figure out your next steps.",
    },
    {
      icon: Puzzle,
      title: "Custom Resources & Exercises",
      description:
        "Access to curated resources and specific exercises to help you learn and grow.",
    },
    {
      icon: GraduationCap,
      title: "Skill Workshops",
      description:
        "Specialized workshops to help you develop new skills and grow your business.",
    },
    {
      icon: Users,
      title: "Accountability Groups",
      description:
        "Join a community of like-minded individuals. Keep each other accountable and stay motivated.",
    },
    {
      icon: Timer,
      title: "24/7 Async Support",
      description:
        "Get help and feedback whenever you need it. We're here to support you.",
    },
  ];

  return (
    <section className="container flex flex-col items-center gap-6 pt-12 pb-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          WHAT YOU GET
        </span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Guidance tailored to you
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        My Kaizen is a flexible program designed to help you learn and achieve
        your business goals.
      </p>
      <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="shadow-lg">
            <CardContent className="flex flex-col items-start gap-5 p-7">
              <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2">
                <feature.icon size={28} className="text-primary" />
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
