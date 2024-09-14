"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";
import { CONSOLE_API_URL } from "@/lib/constants";
import posthog from "posthog-js";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function Newsletter() {
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true);

      const userEmail = form.getValues("email");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        toast.error("Please enter a valid email address");
        setLoading(false);
        return;
      }

      const response = await fetch(`${CONSOLE_API_URL}/users/subscribe`, {
        headers: {
          "Content-Type": "application/json",
          "user-id": user?.id || "",
        },
        method: "POST",
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        form.reset();
        setRegistered(true);
        posthog.capture("newlestter-sub", { email: userEmail });
      } else {
        toast.error("An error occurred while subscribing");
        posthog.capture("newlestter-sub-failed", { email: userEmail });
      }

      setLoading(false);
    },
    [form, user],
  );

  useEffect(() => {
    if (user?.email) {
      setRegistered(true);
    }
  }, [user]);

  return (
    <section id="newsletter" className="bg-[#EDEDBF]">
      <div className="container mx-auto max-w-6xl pt-12 pb-8">
        <div className="grid md:grid-cols-12">
          <div className="col-span-4 pb-4 sm:pb-6">
            <h2 className="mb-2 text-2xl font-semibold">
              Subscribe to the Newsletter
            </h2>
            <p>
              Get the latest tips on how to grow your business and build better
              products.
            </p>
          </div>
          <div className="col-span-8">
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-0 md:col-span-2">
                        <FormLabel className="sr-only">Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading || registered}
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AnimatedSubscribeButton
                    buttonColor="bg-primary"
                    buttonTextColor="text-white"
                    subscribeStatus={registered}
                    initialText="Subscribe"
                    changeText="Subscribed ✓"
                  />
                </div>
              </form>
            </Form>
            <p className="mt-4 text-sm text-gray-500">
              By subscribing, you agree to receive emails related new blog posts
              and any product updates. You can opt-out anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
