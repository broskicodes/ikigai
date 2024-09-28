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
  originalPrice: number;
  recurring?: "week" | "month" | "year";
  featured: boolean;
  features: string[];
  // link: string;
}

const plans: Plan[] = [
  // {
  //   name: "Free",
  //   description: "Test the water",
  //   price: 0,
  //   featured: false,
  //   features: [
  //     "A single call to gain clarity",
  //     "Limited availability (4 slots per week)",
  //     "Fridays only",
  //   ],
  //   // link: ""
  // },
  // {
  //   name: "One Time",
  //   description: "Help when you need it",
  //   price: 19,
  //   featured: true,
  //   features: [
  //     "A single call to gain clarity",
  //     "Priority booking + flexible schedule",
  //     "Post call support",
  //     "Access to curated resources + exercises",
  //   ],
  // },
  {
    name: "The Kaizen Program",
    description: "Make consistent progress week over week",
    price: 49,
    originalPrice: 99,
    recurring: "week",
    featured: true,
    features: [
      "Free onboarding call",
      "Two 1-on-1 meetings per week",
      "Weekly goal review and progress tracking",
      "Tailored resource and excercise recommendations",
      "Access to a community of inspired entrepreneurs",
      "Workshops to help you learn new skills",
      "Asynchronous support from the team",
    ],
  },
];

export function Pricing() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const { user } = useAuth();
  const { scheduledCalls, paidCalls } = useCalls();
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleClick = useCallback(
    async (plan: Plan) => {
      if (!user) {
        return;
      }
      //   setSelectedPlan(plan);

      // if (plan.price === 0) {
      //   setLoading(true);

      //   const res = await fetch(`${CONSOLE_API_URL}/calls/create-link`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "user-id": user.id,
      //     },
      //     body: JSON.stringify({
      //       paid: plan.price > 0,
      //     }),
      //   });

      //   if (!res.ok) {
      //     toast.error("Something went wrong");
      //   }

      //   const link = await res.json();
      //   router.push(link);
      // } else {
      //   if (scheduledCalls.length < 1 && paidCalls.length < 1) {
      //     setLoading(true);

      //     const res = await fetch(
      //       `${CONSOLE_API_URL}/stripe/checkout-session`,
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //           "user-id": user.id,
      //         },
      //         body: JSON.stringify({
      //           success_url: `${ENV_URL}?modal=open`,
      //           cancel_url: ENV_URL,
      //           payment_type: plan.recurring ? "weekly" : "one_time",
      //         }),
      //       },
      //     );

      //     if (!res.ok) {
      //       toast.error("Something went wrong");
      //     }

      //     const link = await res.json();
      //     //   console.log(link);

      //     router.push(link);
      //   } else {
      //     modalTriggerRef.current?.click();
      //   }
      // }
      //   setSelectedPlan(plan);

      //   if (plan.price === 0) {
      setLoading(true);

      posthog.capture("onboarding-clicked");
      const res = await fetch(`${CONSOLE_API_URL}/calls/create-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": user.id,
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
      //   } else {
      //     if (scheduledCalls.length < 1 && paidCalls.length < 1) {
      //       setLoading(true);

      //       const res = await fetch(
      //         `${CONSOLE_API_URL}/stripe/checkout-session`,
      //         {
      //           method: "POST",
      //           headers: {
      //             "Content-Type": "application/json",
      //             "user-id": user.id,
      //           },
      //           body: JSON.stringify({
      //             success_url: `${ENV_URL}?modal=open`,
      //             cancel_url: ENV_URL,
      //             payment_type: plan.recurring ? "weekly" : "one_time",
      //           }),
      //         },
      //       );

      //       if (!res.ok) {
      //         toast.error("Something went wrong");
      //       }

      //       const link = await res.json();
      //       //   console.log(link);

      //       router.push(link);
      //     } else {
      //       modalTriggerRef.current?.click();
      //     }
      //   }
    },
    [user, scheduledCalls, paidCalls, router],
  );

  return (
    <section id="book" className="bg-[#EDEDBF]/40">
      <div className="container flex flex-col items-center gap-6 py-16 sm:gap-7">
        <CallsModal
          plan={null}
          trigger={<Button ref={modalTriggerRef} className="hidden" />}
        />
        <div className="flex flex-col gap-3">
          <span className="font-bold uppercase text-primary text-center">
            Get Started
          </span>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
            Your mentorship plan
          </h2>
        </div>
        <div className="mt-7 grid w-full grid-cols-1 gap-7">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative shadow-lg max-w-2xl mx-auto w-full ${plan.featured ? "border-2 border-primary" : ""}`}
            >
              {/* {plan.featured && (
              <span className="absolute inset-x-0 -top-5 mx-auto w-32 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-md">
                Most popular
              </span>
            )} */}
              <CardContent className="flex flex-col items-center p-7">
                <h4 className="font-heading text-2xl font-semibold text-foreground">
                  {plan.name}
                </h4>
                <p className="mt-2 text-muted-foreground">{plan.description}</p>
                <div className="mt-5 flex flex-col items-center">
                  <span className="text-lg text-muted-foreground line-through">
                    ${plan.originalPrice}
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-heading text-5xl font-semibold">
                      ${plan.price}
                    </span>
                    <span className="text-sm mb-1">/{plan.recurring}</span>
                  </div>
                </div>
                <ul className="space-y-2 mt-8">
                  {plan.features.map((feature, index) => (
                    <li className="flex items-center gap-2" key={index}>
                      <Check size={20} className="text-primary" />
                      <span className="text-base text-muted-foreground">
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
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    <span className="text-lg font-bold">
                      Book FREE Onboarding Call
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
