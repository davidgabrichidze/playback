import Hero from "@/components/sections/Hero";
import WhatIsPlayback from "@/components/sections/WhatIsPlayback";
import HowItWorks from "@/components/sections/HowItWorks";
import Experience from "@/components/sections/Experience";
import Impressions from "@/components/sections/Impressions";
import PerformanceBanner from "@/components/sections/PerformanceBanner";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Ethics from "@/components/sections/Ethics";
import Join from "@/components/sections/Join";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsPlayback />
      <HowItWorks />
      <Experience />
      <Impressions />
      <PerformanceBanner />
      <Gallery />
      <Team />
      <Ethics />
      <Join />
    </>
  );
}
