"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, X } from "lucide-react";
import { useCalls } from "@/providers/calls-provider";
import { Plan } from "./lp/pricing";
import { CONSOLE_API_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";

export function CallsModal({
  trigger,
  plan,
}: {
  trigger: ReactNode;
  plan: Plan | null;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useAuth();
  const { scheduledCalls, paidCalls } = useCalls();

  const handleCancelCall = (id: string) => {
    // Here you would typically call an API to cancel the call
    console.log(`Cancelling call with id: ${id}`);
    // Then update the UI accordingly
  };

  const handlePayForCall = useCallback(async () => {
    if (!plan) return;

    setLoading(true);

    const res = await fetch(`${CONSOLE_API_URL}/stripe/checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": user?.id || "",
      },
      body: JSON.stringify({
        success_url: "https://mykaizen.life/",
        cancel_url: "https://mykaizen.life/",
        payment_type: plan.recurring ? "weekly" : "one_time",
      }),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    }

    const link = await res.json();
    router.push(link);
  }, [user, plan, router]);

  const handleModalOpen = useCallback(() => {
    if (paidCalls.length < 1) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const modalParam = urlParams.get("modal");

    if (modalParam === "open") {
      setOpen(true);
    }
  }, [paidCalls]);

  useEffect(() => {
    handleModalOpen();
  }, [handleModalOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="h-80 flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle>Manage Your Calls</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="available" className="flex-grow flex flex-col">
          <TabsList>
            <TabsTrigger value="available" className="w-full">
              Available Call Slots
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="w-full">
              Scheduled Calls
            </TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="flex-grow overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead className="w-[150px]">Type</TableHead>
                  <TableHead className="w-[150px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paidCalls.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.payment_type === "one_time"
                        ? "One Time"
                        : "Weekly"}
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="default" className="w-full">
                        <a
                          href={payment.cal_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                        >
                          Book Call
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="scheduled" className="flex-grow overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead className="w-[200px]">Scheduled Time</TableHead>
                  <TableHead className="w-[200px]">Booked At</TableHead>
                  <TableHead className="w-[150px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">
                      {new Date(call.scheduled_time).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(call.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelCall(call.id)}
                      >
                        Cancel
                        <X className="ml-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
        {/* <DialogFooter>
          <Button
            variant="default"
            className="w-full"
            onClick={handlePayForCall}
            disabled={loading}
          >
            Pay for Call
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
