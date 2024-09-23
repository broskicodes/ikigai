import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { HeartHandshake } from "lucide-react";
import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import posthog from "posthog-js";
import { CONSOLE_API_URL } from "@/lib/constants";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/providers/auth-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";

const reviews = [
  {
    name: "Alfonso Reyes 🌱",
    username: "@ojoanalogo",
    body: "interested, i've been building non-stop the latest 6 months but i keep telling myself there's something missing, would love to chat!",
    img: "https://unavatar.io/x/ojoanalogo",
  },
  {
    name: "Aditya",
    username: "@Note_Aditya",
    body: "Now that's something we are talking about!!",
    img: "https://unavatar.io/x/Note_Aditya",
  },
  {
    name: "Kai",
    username: "@hulloitskai",
    body: "you're awesome :)",
    img: "https://unavatar.io/x/hulloitskai",
  },
  {
    name: "Rawand",
    username: "@rwd0x1113017",
    body: "I need your help! I am building my own saas",
    img: "https://unavatar.io/x/rwd0x1113017",
  },
  {
    name: "OMKAR KADAM",
    username: "@omkarokkadam",
    body: "yes, interested. Let's build!",
    img: "https://unavatar.io/x/omkarokkadam",
  },
  {
    name: "Muse",
    username: "@MrSIowJam",
    body: "Really generous of you bro, I would really appreciate your help. I'm kinda lost with one I'm trying to create",
    img: "https://unavatar.io/x/MrSIowJam",
  },
  {
    name: "Mirtul",
    username: "@mritulfounds",
    body: "Would love to get your insights :)",
    img: "https://unavatar.io/x/mritulfounds",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-[2rem] border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function CallToAction() {
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
    <section id="cta">
      <div className="py-8">
        <div className="container flex w-full flex-col items-center justify-center p-4">
          <div className="relative flex w-full max-w-[1000px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border p-10 py-14">
            <div className="absolute rotate-[35deg]">
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
            </div>
            <div className="z-10 mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32">
              <HeartHandshake className="mx-auto size-16 text-black dark:text-white lg:size-24" />
            </div>
            <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
              <h1 className="text-3xl font-bold lg:text-4xl">
                Subscribe to our newsletter
              </h1>
              <p className="mt-2">
                Get the latest tips on how to grow your business and build
                better products.
              </p>
              <div className="mt-8">
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
                                className="bg-white"
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
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-background to-70% dark:to-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
