import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { CONSOLE_API_URL, ENV_URL } from "@/lib/constants";
import { useAuth } from "@/providers/auth-provider";
import posthog from "posthog-js";
import { useCalls } from "@/providers/calls-provider";
import { useRouter } from "next/navigation";
import { CallsModal } from "../calls-modal";
import { toast } from "sonner";

export interface Plan {
  name: string;
  description: string;
  price: number;
  recurring?: "week" | "month" | "year";
  featured: boolean;
  features: string[];
  // link: string;
}

export function Pricing() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const { user } = useAuth();
  const { scheduledCalls, paidCalls } = useCalls();
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const plans: Plan[] = [
    {
      name: "Free",
      description: "Test the water",
      price: 0,
      featured: false,
      features: [
        "A single call to gain clarity",
        "Fridays only",
        "Limited availability (4 slots per week)",
      ],
      // link: ""
    },
    {
      name: "One Time",
      description: "Help when you need it",
      price: 19,
      featured: true,
      features: [
        "A single call to gain clarity",
        "Priority booking + flexible schedule",
        "Post call support",
        "Access to curated resources + exercises",
      ],
    },
    {
      name: "Recurring",
      description: "Grow with weekly guidance",
      price: 49,
      recurring: "week",
      featured: false,
      features: [
        "2 calls per week",
        "Priority booking + flexible schedule",
        "Personalized resources + exercises",
        "Asynchronous support from the team",
      ],
    },
  ];

  const handleClick = useCallback(
    async (plan: Plan) => {
    //   setSelectedPlan(plan);

      if (plan.price === 0) {
        setLoading(true);

        const res = await fetch(`${CONSOLE_API_URL}/calls/create-link`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": user?.id || "",
          },
          body: JSON.stringify({
            paid: plan.price > 0,
          }),
        });

        if (!res.ok) {
          toast.error("Something went wrong");
        }

        const link = await res.json();
        router.push(link);
      } else {
        if (scheduledCalls.length < 1 && paidCalls.length < 1) {
          setLoading(true);

          const res = await fetch(
            `${CONSOLE_API_URL}/stripe/checkout-session`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "user-id": user?.id || "",
              },
              body: JSON.stringify({
                success_url: `${ENV_URL}?modal=open`,
                cancel_url: ENV_URL,
                payment_type: plan.recurring ? "weekly" : "one_time",
              }),
            },
          );

          if (!res.ok) {
            toast.error("Something went wrong");
          }

          const link = await res.json();
          //   console.log(link);

          router.push(link);
        } else {
          modalTriggerRef.current?.click();
        }
      }
    },
    [user, scheduledCalls, paidCalls, router],
  );

  return (
    <section
      id="pricing"
      className="container flex flex-col items-center gap-6 py-16 sm:gap-7 bg-[#EDEDBF]"
    >
      <CallsModal
        plan={null}
        trigger={<Button ref={modalTriggerRef} className="hidden" />}
      />
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          Pricing
        </span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Choose your paln
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-lg text-center">
        Flexible pricing that works for you
      </p>
      <div className="mt-7 grid w-full grid-cols-1 gap-7 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative shadow-lg ${plan.featured ? "border-2 border-primary" : ""}`}
          >
            {plan.featured && (
              <span className="absolute inset-x-0 -top-5 mx-auto w-32 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-md">
                Most popular
              </span>
            )}
            <CardContent className="flex flex-col items-start p-7">
              <h4 className="font-heading text-2xl font-semibold text-foreground">
                {plan.name}
              </h4>
              <p className="mt-2 text-muted-foreground">{plan.description}</p>
              <div className="mt-5">
                <span className="font-heading text-5xl font-semibold">
                  ${plan.price}
                </span>
                <span className="text-sm">
                  {plan.recurring ? `/${plan.recurring}` : ""}
                </span>
              </div>
              <ul className="space-y-2 mt-9 h-32">
                {plan.features.map((feature, index) => (
                  <li className="flex items-center gap-2" key={index}>
                    <Check size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                asChild
                className="mt-10 w-full cursor-pointer"
                onClick={() => handleClick(plan)}
                disabled={loading}
              >
                {/* <a href="https://cal.com/braeden/kaizen">Book a call</a> */}
                <span>Book a call</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
