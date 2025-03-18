import Greetings from "@/components/Greetings/Greetings";
import AboutUs from "@/components/AboutUs/AboutUs";
import WireAnimation from "@/components/WireAnimation/WireAnimation";
import HowDoWeWork from "@/components/HowDoWeWork/HowDoWeWork";
import Facts from "@/components/Facts/Facts";
import QuestionsBlock from "@/components/QuestionsBlock/QuestionsBlock";
import Parteners from "@/components/Partners/Partners";
import JoinUs from "@/components/JoinUs/JoinUs";
import Footer from "@/components/Footer/Footer";

import styles from "../styles/index.module.css";

export async function generateStaticParams() {
  return [{}];
}

function Home() {
  return (
    <div className={styles.index}>
      <Greetings />
      <AboutUs />
      <HowDoWeWork />
      <Facts />
      <QuestionsBlock />
      <Parteners />
      <JoinUs />
      <Footer />

      <WireAnimation videoSrc="/videos/animation1.mp4" top="50vh" />
      <WireAnimation videoSrc="/videos/animation2.mp4" top="150vh" />
    </div>
  );
}

export default Home;
