import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";

interface CustomToastProps {
  message: string;
}

export const CustomToast = ({ message }: CustomToastProps) => {
  // const { theme } = useTheme();

  // toast.success(message, {
  //   className: theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
  // });
};

export const CustomErrorToast = ({ message }: CustomToastProps) => {
  toast.error(message);
};