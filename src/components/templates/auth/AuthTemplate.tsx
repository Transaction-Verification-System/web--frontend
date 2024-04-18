import { TemplateProps } from "@/constants/interface/TemplateProps.interface";

interface AuthTemplateProps extends TemplateProps {
  className?: string;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <div className="h-screen overflow-hidden flex justify-center items-center border">
      <div className="flex justify-center gap-5 items-center ">
        <div className="mt-10 md:w-1/2 p-10 flex flex-col gap-10">{children}</div>
        <div className=" hidden md:block md:w-1/2 px-16  py-10 ">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=3145&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Welcome Image"
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
