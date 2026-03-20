
import { div } from "motion/react-client";
import Image from "next/image";
import Dashboard from "./dashboard/page";
import HomePage from "@/pages/HomePage";

export default function Home() {
  return (
    <div>
      {/* <Dashboard/> */}
      <HomePage/>
    </div>
  );
}
