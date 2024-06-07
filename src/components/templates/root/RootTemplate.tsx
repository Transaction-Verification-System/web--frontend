import NavBar from "@/components/molecules/navigation/NavBar";

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
