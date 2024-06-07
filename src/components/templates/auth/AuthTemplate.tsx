import { TemplateProps } from "@/constants/interface/TemplateProps.interface";
import RootTemplate from "../root/RootTemplate";

interface AuthTemplateProps extends TemplateProps {
  className?: string;
}

/**
 *-----------------------------------------------------------------------------
 * @returns AuthTemplate component
 *
 * @description
 * displays the authentication template
 * that wraps the children components
 *-----------------------------------------------------------------------------
 */
export default function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <RootTemplate>
      <div className=" flex w-full h-full justify-center items-center">
        <div className=" p-10 flex flex-col gap-6 border rounded-xl w-1/2">
          {children}
        </div>
      </div>
    </RootTemplate>
  );
}
