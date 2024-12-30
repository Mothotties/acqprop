// Import from the hooks directory where the implementation lives
import { useToast as useToastHook, toast } from "@/hooks/use-toast";

// Re-export the hook and toast function
export { useToastHook as useToast, toast };