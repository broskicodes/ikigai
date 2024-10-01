"use client"

import { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { GoalStatus } from '@/lib/types'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useAuth } from '@/providers/auth-provider'
import { CONSOLE_API_URL } from '@/lib/constants'


interface GoalFormData {
  name: string
  status: GoalStatus
  target: number
  startDate: Date
  endDate: Date
}

export function GoalModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<GoalFormData>({
    name: '',
    status: GoalStatus.TO_DO,
    target: 0,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  })

  const { user } = useAuth();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSelectChange = useCallback((name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleStartDateChange = useCallback((date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, startDate: date }))
    }
  }, [])

  const handleEndDateChange = useCallback((date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, endDate: date }))
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      console.error("User not found")
      return
    }

    console.log('Form submitted:', formData)

    // Ensure end date is after start date
    if (formData.endDate <= formData.startDate) {
      alert("End date must be after start date");
      return;
    }

    const response = await fetch(`${CONSOLE_API_URL}/goals/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": user.id,
      },
      body: JSON.stringify({
        ...formData,
        target: Number(formData.target),
        startDate: formData.startDate.toISOString().split('T')[0],
        endDate: formData.endDate.toISOString().split('T')[0],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Goal created:", data);
      setIsOpen(false);
    } else {
      console.error("Failed to create goal")
    }
  }, [formData, setIsOpen, user])


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row space-x-2 items-center">
            <Label className="w-32" htmlFor="name">Goal Name</Label>
            <Input
              id="name"
              name="name"
              className="bg-white"
              value={formData.name}
              onChange={handleInputChange}
              required
            />  
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <Label className="w-32" htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={handleSelectChange('status')}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={GoalStatus.TO_DO}>Not Started</SelectItem>
                <SelectItem value={GoalStatus.IN_PROGRESS}>In Progress</SelectItem>
                <SelectItem value={GoalStatus.COMPLETE}>Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <Label className="w-32" htmlFor="target">Target</Label>
            <Input
              id="target"
              name="target"
              type="number"
              className="bg-white"
              value={formData.target}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <Label className="w-32">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal bg-white ${
                    !formData.startDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <Label className="w-32">Target Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal bg-white ${
                    !formData.endDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}