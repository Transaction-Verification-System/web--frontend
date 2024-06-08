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
      <div className="flex w-full h-full justify-center items-center p-4">
        <div className="p-6 sm:p-10 flex flex-col gap-6 md:border rounded-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          {children}
        </div>
      </div>
    </RootTemplate>
  );
}
