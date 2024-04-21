import { TemplateProps } from "@/constants/interface/TemplateProps.interface";

interface AuthTemplateProps extends TemplateProps {
  className?: string;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <div className="h-screen overflow-hidden flex justify-center items-center border">
      <div className=" p-10 flex flex-col gap-10 border rounded-xl">{children}</div>
    </div>
  );
}
