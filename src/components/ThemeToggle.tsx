import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Toggle the 'dark' class on the root element
    document.documentElement.classList.toggle("dark");
    
    // Store the preference
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 h-10 w-10 rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      onClick={toggleTheme}
    >
      {isDark ? (
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}