"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5" />
        </button>
      </div>
    );
  }

  const currentThemeIcon = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }[theme || "system"];

  const CurrentIcon = currentThemeIcon || Monitor;

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            aria-label="Toggle theme"
          >
            <CurrentIcon className="h-5 w-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-40 p-1 rounded-2xl shadow-none"
          align="end"
          side="top"
        >
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "flex items-center gap-2 rounded-2xl px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                theme === "light" && "bg-accent text-accent-foreground"
              )}
            >
              <Sun className="h-4 w-4" />
              <span className="font-sans">Light</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "flex items-center gap-2 rounded-2xl px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                theme === "dark" && "bg-accent text-accent-foreground"
              )}
            >
              <Moon className="h-4 w-4" />
              <span className="font-sans">Dark</span>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={cn(
                "flex items-center rounded-2xl gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                theme === "system" && "bg-accent text-accent-foreground"
              )}
            >
              <Monitor className="h-4 w-4" />
              <span className="font-sans">System</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
