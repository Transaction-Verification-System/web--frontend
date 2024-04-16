import { TemplateProps } from "@/constants/interface/TemplateProps.interface";

interface AuthTemplateProps extends TemplateProps {
  className?: string;
}

export default function AuthTemplate({ children , className }: AuthTemplateProps) {
  return (
    <div className={(" min-h-screen flex justify-center items-center ") + className}>
      {children}
    </div>
  );
}
