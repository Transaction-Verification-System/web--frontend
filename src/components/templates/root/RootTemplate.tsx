import NavBar from "@/components/molecules/navigation/NavBar";


/**
 *-----------------------------------------------------------------------------
 * @returns RootTemplate component
 *
 * @description
 * This is the root template component
 * that wraps the NavBar component
 * and the children components
 *-----------------------------------------------------------------------------
 */
export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" p-5 flex flex-col gap-10">
      <NavBar />
      {children}
    </div>
  );
}
