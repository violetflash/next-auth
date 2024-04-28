"use client"

import { Button } from "@/components/ui/button"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { forwardRef, useState } from "react"
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const disabled = props.value === "" || props.value === undefined || props.disabled

    return (
      <div className="relative">
        <Input
          {...props}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          type={showPassword ? "text" : "password"}
        />
        {!disabled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
          >
            {showPassword ? (
              <BsEyeSlash
                className="size-5"
                aria-hidden="true"
              />
            ) : (
              <BsEye
                className="size-5"
                aria-hidden="true"
              />
            )}
            <span className="sr-only">
						{showPassword ? "Hide password" : "Show password"}
					</span>
          </Button>
        )}
        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    )
  },
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }