import { TouchableOpacity } from "react-native";

interface MainButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  children: React.ReactNode;
}

export function MainButton({ children, ...props }: MainButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
    >
      { children }
    </TouchableOpacity>
  )
}