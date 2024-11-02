import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label="Toggle theme">
        <Button
          variant="outline"
          size="icon"
          aria-pressed={theme === "dark"}
          aria-live="polite"
          className="relative"
        >
          <Sun
            className={`h-5 w-5 transition-transform ${
              theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
            aria-hidden={theme === "dark"}
          />
          <Moon
            className={`absolute h-5 w-5 transition-transform ${
              theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
            aria-hidden={theme !== "dark"}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} aria-pressed={theme === "light"}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} aria-pressed={theme === "dark"}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
