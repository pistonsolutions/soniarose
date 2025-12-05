import * as React from "react"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
    open: false,
    setOpen: () => { },
})

export const Dialog = ({ children, open: controlledOpen, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen
    const setOpen = React.useCallback((newOpen: boolean | ((prev: boolean) => boolean)) => {
        const nextOpen = typeof newOpen === 'function' ? newOpen(open) : newOpen
        if (!isControlled) {
            setUncontrolledOpen(nextOpen)
        }
        onOpenChange?.(nextOpen)
    }, [isControlled, onOpenChange, open])

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    )
}

export const DialogTrigger = ({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) => {
    const { setOpen } = React.useContext(DialogContext)
    return (
        <div onClick={() => setOpen(true)} className="cursor-pointer inline-block">
            {children}
        </div>
    )
}

export const DialogContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const { open, setOpen } = React.useContext(DialogContext)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!open || !mounted) return null

    // Use a Portal to render the dialog at the document body level, 
    // ensuring it appears above all other content and isn't constrained by parent overflow.
    const { createPortal } = require('react-dom');

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={cn("relative z-[101] grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg", className)}>
                {children}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <span className="sr-only">Close</span>
                    ✕
                </button>
            </div>
        </div>,
        document.body
    )
}

export const DialogHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>
            {children}
        </div>
    )
}

export const DialogTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
            {children}
        </div>
    )
}

export const DialogDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </div>
    )
}

export const DialogFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>
            {children}
        </div>
    )
}
