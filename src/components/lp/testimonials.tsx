import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-[#62786D]/20 px-0.5 py-0.5 font-bold text-[#62786D] dark:bg-[#62786D]/20 dark:text-[#62786D]",
        className,
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-foreground dark:text-foreground/50">
      {description}
      <div className="flex flex-row py-1">
        <StarFilledIcon className="size-4 text-primary" />
        <StarFilledIcon className="size-4 text-primary" />
        <StarFilledIcon className="size-4 text-primary" />
        <StarFilledIcon className="size-4 text-primary" />
        <StarFilledIcon className="size-4 text-primary" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <img
        src={img}
        className="h-10 w-10 rounded-full  ring-1 ring-border ring-offset-4"
        alt={name.split(" ").map((word) => word[0]).join("")}
      />

      <div>
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-xs font-normal text-foreground/50">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Mattia Pomelli",
    role: "Co-Founder of Reweb",
    img: "https://unavatar.io/x/mattiapomelli",
    description: (
      <p>
        {"Whenever I feel stuck I reach out to Braeden. Talking with him is always super helpful to get clarity on what I want. It's crazy how much having someone that "}
        <Highlight>
          {"asks you the right questions and is open to listen to you"}
        </Highlight>
        {" can help you figure shit out. He's the guru."}
      </p>
    ),
  },
  {
    name: "Matthew Molinar",
    role: "Buildspace Grad",
    img: "/images/molinar.webp",
    description: (
      <p>
        {"Braeden is very insightful and can advise you on how to get off zero very quickly. "}
        <Highlight>
          {"He speaks with practical real life experience from being a founder"}
        </Highlight>
        {" and it will save you a lot of time on your journey!"}
      </p>
    ),
  },
  {
    name: "Kirsten Pomales",
    role: "Founder & CEO of Revyou",
    img: "https://unavatar.io/x/kirstenrpomales",
    description: (
      <p>
        <Highlight>
          {"Braeden is a great soundboard."}
        </Highlight>
        {" He's been so helpful in talking through issues I've tackled in my business and always has good questions to help me approach things a different way. Thanks Braeden!"}
      </p>
    ),
  },
  {
    name: "Rostyslav Dzhohola",
    role: "Creator of the AI Unscripted podcast",
    img: "https://unavatar.io/x/dzhohola",
    description: (
      <p>
        {"I know Braeden from Buildspace time. He's had several successful projects. During our call, I received interesting directions that I can take my project and a couple of "}
        <Highlight>
        {"useful suggestions for the iteration process and MVP development."}
        </Highlight>
      </p>
    ),
  },
  {
    name: "Aviral Sharma",
    role: "Founder of Skan - AI skin care",
    img: "https://unavatar.io/x/aviralgod",
    description: (
      <p>
        {"It was an absolute pleasure chatting with Braeden! I started the call with a lack of direction, but after 5-10 minutes of listening to my problems, "}
        <Highlight>
          {"Braeden was able to dissect my issues and help me realize what I really needed to focus on."}
        </Highlight>
        {" Some of the advice he gave me is already starting to work and increase our conversion."}
      </p>
    ),
  },
  {
    name: "Aditya Gayakwad",
    role: "Buildspace Grad",
    img: "https://unavatar.io/x/avg_aditya",
    description: (
      <p>
        {"Before talking to him I was working on multiple side projects simultaneously thinking at least one would scale. "}
        <Highlight>
          {"Braeden helped me figure out which one to focus on."}
        </Highlight>
        {" That side project became my main project and eventually a startup. Now we are getting good responses and feedback and are launching the beta version soon. Also I like his jawline."}
      </p>
    ),
  },
  // {
  //   name: "DG",
  //   role: "Radio Host at Banr",
  //   img: "https://unavatar.io/x/LadyDiGiTech",
  //   description: (
  //     <p>
  //       {"I didn't know Braeden before I took a call with him. After asking me questions about my company and what I was building, "}
  //       <Highlight>
  //         {"he suggested a new angle that had not crossed my mind as a possibility."}
  //       </Highlight>
  //       {" I plan to use his suggestions to help help my business grow. I'm glad I took a call with Braeden!"}
  //     </p>
  //   ),
  // },
  // {
  //   name: "Aisha Khan",
  //   role: "Chief Marketing Officer at Fashion Forward",
  //   img: "https://randomuser.me/api/portraits/women/56.jpg",
  //   description: (
  //     <p>
  //       #TrendSetter's market analysis AI has transformed how we approach
  //       fashion trends.
  //       <Highlight>
  //         Our campaigns are now data-driven with higher customer engagement.
  //       </Highlight>{" "}
  //       Revolutionizing fashion marketing.
  //     </p>
  //   ),
  // },
  // {
  //   name: "Tom Chen",
  //   role: "Director of IT at HealthTech Solutions",
  //   img: "https://randomuser.me/api/portraits/men/18.jpg",
  //   description: (
  //     <p>
  //       Implementing #MediCareAI in our patient care systems has improved
  //       patient outcomes significantly.
  //       <Highlight>
  //         Technology and healthcare working hand in hand for better health.
  //       </Highlight>{" "}
  //       A milestone in medical technology.
  //     </p>
  //   ),
  // },
  // {
  //   name: "Sofia Patel",
  //   role: "CEO at EduTech Innovations",
  //   img: "https://randomuser.me/api/portraits/women/73.jpg",
  //   description: (
  //     <p>
  //       #LearnSmart's AI-driven personalized learning plans have doubled student
  //       performance metrics.
  //       <Highlight>Education tailored to every learner's needs.</Highlight>{" "}
  //       Transforming the educational landscape.
  //     </p>
  //   ),
  // },
  // {
  //   name: "Jake Morrison",
  //   role: "CTO at SecureNet Tech",
  //   img: "https://randomuser.me/api/portraits/men/25.jpg",
  //   description: (
  //     <p>
  //       With #CyberShield's AI-powered security systems, our data protection
  //       levels are unmatched.
  //       <Highlight>Ensuring safety and trust in digital spaces.</Highlight>{" "}
  //       Redefining cybersecurity standards.
  //     </p>
  //   ),
  // },
  // {
  //   name: "Nadia Ali",
  //   role: "Product Manager at Creative Solutions",
  //   img: "https://randomuser.me/api/portraits/women/78.jpg",
  //   description: (
  //     <p>
  //       #DesignPro's AI has streamlined our creative process, enhancing
  //       productivity and innovation.
  //       <Highlight>Bringing creativity and technology together.</Highlight> A
  //       game-changer for creative industries.
  //     </p>
  //   ),
  // },
  // {
  //   name: "Omar Farooq",
  //   role: "Founder at Startup Hub",
  //   img: "https://randomuser.me/api/portraits/men/54.jpg",
  //   description: (
  //     <p>
  //       #VentureAI's insights into startup ecosystems have been invaluable for
  //       our growth and funding strategies.
  //       <Highlight>Empowering startups with data-driven decisions.</Highlight> A
  //       catalyst for startup success.
  //     </p>
  //   ),
  // },
];

export function Testimonials() {
  const [numGroups, setNumGroups] = useState(3);
  const [testimonialGroups, setTestimonialGroups] = useState<TestimonialCardProps[][]>([]);

  useEffect(() => {
    const updateNumGroups = () => {
      // if (window.innerWidth >= 1536) {
      //   setNumGroups(4); // 2xl
      // }
      if (window.innerWidth >= 1280) {
        setNumGroups(3); // xl
      } else if (window.innerWidth >= 768) {
        setNumGroups(2); // md
      } else {
        setNumGroups(1); // sm and below
      }
    };

    window.addEventListener('resize', updateNumGroups);
    updateNumGroups(); // Initial call to set the number of groups based on the current window size

    return () => window.removeEventListener('resize', updateNumGroups);
  }, []);

  useEffect(() => {
    const groupSize = Math.floor(testimonials.length / numGroups);
    const newTestimonialGroups = Array.from({ length: numGroups }, (_, i) => {
      if (i === numGroups - 1) {
        return testimonials.slice(i * groupSize);
      }
      return testimonials.slice(i * groupSize, (i + 1) * groupSize);
    });

    setTestimonialGroups(newTestimonialGroups);
  }, [numGroups]);

  return (
    <section id="testimonials">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-3">
            <span className="font-bold uppercase text-primary text-center">
              Testimonials
            </span>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
              What people are saying
            </h2>
          </div>
          <div className="relative mt-6 max-h-[650px] overflow-hidden">
            <div className={`gap-4 ${numGroups === 1 ? "columns-1" : numGroups === 2 ? "columns-2" : numGroups === 3 ? "columns-3" : "columns-4"}`}>
              {testimonialGroups.map((group, i) => (
                <Marquee
                  vertical
                  key={i}
                  reverse={i % 2 === 0}
                  className={cn(
                    "[--duration:20s]"
                  )}
                >
                  {group.map((card, idx) => (
                    <TestimonialCard {...card} key={idx} />
                  ))}
                </Marquee>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20% dark:from-black"></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20% dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
