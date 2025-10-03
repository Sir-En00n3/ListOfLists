import UiBtn from "./components/UiBtn";



export default function Home() {
  return (
    <div className="relative font-sans flex flex=col items-center justify-items-center w-full h-full text-white bg-bgp">
      <main className="flex flex-col justify-center items-center w-full h-full border-4 border-yellow-400">
        <p className="words">These are Words!@#$?</p>
        <div className="w-full h-10"></div>
        <UiBtn />
      </main> 
    </div>
  );
}
