"use client"
import React, { useState } from 'react'
import CustomerChoice from './forms/customer-choice'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Progress,
  ProgressValue,
  ProgressLabel
} from "@/components/ui/progress"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import RoomChoice from './forms/room-choice'
import RoomAccount from './forms/room-account'

const Reservation = () => {
  const step = 2
  const [progress, setProgress] = useState<number>(0)
  const [percent, setPercent] = useState<number>(0)
  const updatePercent = (step: number, progression: number) => {
    const result = (progression * 100) / (step+1)
    setPercent(result)
  }
  const next = () => {
    if (progress < step ) {
      setProgress((prev) => prev + 1)
      updatePercent(step, progress + 1)
    }
  }
  const previous = () => {
    if (progress > 0) {
      setProgress((prev) => prev - 1)
      updatePercent(step, progress - 1)
    }
  }
  return (
    <div className="container mx-auto py-10 px-3">
      <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
        <Collapsible
          open={progress === 0}
        >
          <CollapsibleContent>
            <CustomerChoice />
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={progress === 1}
          className="flex items-start gap-2"
        >
          <CollapsibleContent>
            <RoomChoice />
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={progress === 2}
          className="flex items-start gap-2"
        >
          <CollapsibleContent>
            <RoomAccount />
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <Button
          variant="default"
          size="icon"
          className="rounded-full cursor-pointer"
          onClick={previous}
        >
          <ArrowLeft />
        </Button>
        <Progress value={percent} className="w-full max-w-sm">
          <ProgressLabel>Progression du formulaire</ProgressLabel>
          <ProgressValue />
        </Progress>
        {/* {progress}/{step} */}
        {step === progress ?
          <Button
            variant="default"
            className={"cursor-pointer"}
            onClick={next}
          >
            Valider
          </Button>
          :
          <Button
            variant="default"
            size="icon"
            className={"rounded-full cursor-pointer"}
            onClick={next}
          >
            <ArrowRight />
          </Button>
        }
      </div>
    </div>
  )
}

export default Reservation