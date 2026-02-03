import NewListBtn from "./components/NewListBtn";
import WelcomeBtn from "./components/WelcomeBtn";

export default function Home() {
  return (
    <div className="relative flex justify-center items-center text-center">
      <p className="words">These are Words!@#$?</p>
        <div className="h-10 w-full">
          <NewListBtn />
          <WelcomeBtn />
        </div>
    </div>
  );
}
