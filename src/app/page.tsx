
import { div } from "motion/react-client";
import Image from "next/image";
import Dashboard from "./dashboard/page";
import HomePage from "@/pages/HomePage";
import Products from "@/pages/Products";

export default function Home() {
  return (
    <div>
      <HomePage/>
      <Products/>
    </div>
  );
}
