import { TemplateProps } from "@/constants/interface/TemplateProps.interface";

interface AuthTemplateProps extends TemplateProps {
  // props specific to auth here
}

export default function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <div className=" min-h-screen border border-red-500 flex justify-center items-center">
      {children}
    </div>
  );
}
