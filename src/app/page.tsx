import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Audience from "@/components/Audience";
import Testimonials from "@/components/Testimonials";
import WaitlistForm from "@/components/WaitlistForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Audience />
        <Testimonials />
        <WaitlistForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
