import { PropsWithChildren, useCallback, useState } from "react"
import { Goal, GoalStatus } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CONSOLE_API_URL } from "@/lib/constants"
import { useAuth } from "@/providers/auth-provider"
import { toast } from "sonner"

interface GoalUpdateModalProps {
  goal: Goal | null
  trigger: React.ReactNode
}

export function GoalUpdateModal({
  goal,
  trigger,
}: GoalUpdateModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
  const [newProgress, setNewProgress] = useState<number | "">("")
  const { user } = useAuth()

  const handleUpdateProgress = useCallback(async () => {
    setIsLoading(true)

    if (goal && typeof newProgress === "number" && user) {
        const response = await fetch(`${CONSOLE_API_URL}/goals/${goal.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "user-id": user.id,
            },
            body: JSON.stringify({
              progress: newProgress,
            }),
          });
          if (response.ok) {
            toast.success("Progress updated successfully")
          } else {
            toast.error("Failed to update progress")
          }

        setIsOpen(false)
        setIsLoading(false)
    }
  }, [goal, newProgress])

  const handleArchiveGoal = useCallback(async () => {
    setIsLoading(true)

    if (goal && user) {
        const response = await fetch(`${CONSOLE_API_URL}/goals/${goal.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "user-id": user.id,
            },
            body: JSON.stringify({
              status: goal.status === GoalStatus.ARCHIVED ? GoalStatus.TO_DO : GoalStatus.ARCHIVED,
            }),
          });
          if (response.ok) {
            toast.success(`Goal ${goal.status === GoalStatus.ARCHIVED ? "activated" : "archived"} successfully`)
          } else {
            toast.error(`Failed to ${goal.status === GoalStatus.ARCHIVED ? "activate" : "archive"} goal`)
          }

        setIsOpen(false)
        setIsLoading(false)
    }
  }, [goal, user])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Goal: {goal?.name}</DialogTitle>
          <DialogDescription>
            Update progress or archive this goal.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center py-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Update Progress</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none">Update Progress</h4>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="progress" className="text-right">
                    Progress
                  </Label>
                  <Input
                    id="progress"
                    type="number"
                    className="col-span-3 bg-white"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    placeholder="Enter new progress"
                  />
                </div>
                <Button onClick={handleUpdateProgress} disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">{goal?.status === GoalStatus.ARCHIVED ? "Activate Goal" : "Archive Goal"}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none">{goal?.status === GoalStatus.ARCHIVED ? "Activate Goal" : "Archive Goal"}</h4>
                <p>Are you sure you want to {goal?.status === GoalStatus.ARCHIVED ? "activate" : "archive"} this goal?</p>
                <p>Your progress will {goal?.status === GoalStatus.ARCHIVED ? "start being tracked" : "stop being tracked"}.</p>
                <Button variant="outline" onClick={handleArchiveGoal} disabled={isLoading} className="bg-white">
                  {isLoading ? "Loading..." : goal?.status === GoalStatus.ARCHIVED ? "Activate Goal" : "Archive Goal"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </DialogContent>
    </Dialog>
  )
}