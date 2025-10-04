import UiBtn from "./components/UiBtn";

export default function Home() {
  return (
    <div className="flex=col relative flex h-full w-full items-center justify-items-center bg-bgp font-sans text-white">
      <main className="flex h-full w-full flex-col items-center justify-center border-4 border-yellow-400">
        <p className="words">These are Words!@#$?</p>
        <div className="h-10 w-full"></div>
        <UiBtn />
      </main>
    </div>
  );
}
