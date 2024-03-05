"use client"

import { X, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"


import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { deleteBoard } from "@/actions/delete-board"
import { useAction } from "@/hooks/use-action"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/ui/popover"



interface BoardOptionProps {
    id: string
}

export const BoardOptions = ({ id }: BoardOptionProps) => {

    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDelete = () => {
        execute({ id })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="g-auto w-auto p-2" variant="transparent">
                    <MoreHorizontal
                        className="h-4 w-4"
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 pt-0 pb-3"
                side="bottom"
                align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4 pt-2">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2
                             text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>

                <Separator />

                <Button
                    disabled={isLoading}
                    variant="ghost"
                    onClick={onDelete}
                    className="rounded-none w-full h-auto p-2 px-5 pt-3 justify-start font-normal text-sm "
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}