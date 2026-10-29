import MainHero from "@/components/home/MainHero";
import PageTransition from "@/components/PageTransition";
import Splash from "@/components/splash/Splash";

export default function Home() {
  return (
    <Splash>
      <PageTransition>
        <MainHero />
      </PageTransition>
    </Splash>
  );
}
