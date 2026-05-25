
// import { div } from "motion/react-client";
import Image from "next/image";
import Dashboard from "./dashboard/page";
import HomePage from "@/pages/HomePage";
import Products from "@/pages/Products";
import Banner from "@/pages/Banner";

export default function Home() {
  return (
    <div>
      <HomePage/>
      <Banner/>
      <Products/>
    </div>
  );
}
