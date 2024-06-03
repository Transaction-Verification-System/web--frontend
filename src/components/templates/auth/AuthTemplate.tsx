import NavBar from "@/components/molecules/navigation/NavBar";
import { TemplateProps } from "@/constants/interface/TemplateProps.interface";

interface AuthTemplateProps extends TemplateProps {
  className?: string;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <div className="h-screen overflow-hidden flex flex-col p-5">
      <NavBar />
      <div className=" flex w-full h-full justify-center items-center">
        <div className=" p-10 flex flex-col gap-6 border rounded-xl w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}
