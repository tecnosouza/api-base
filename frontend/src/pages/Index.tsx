import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesIntroSection from "@/components/ServicesIntroSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-pollimper-navy">
        <Header transparent={true}/>
        <HeroSection />
      </div>
      <AboutSection />
      <ServicesIntroSection />
      <PortfolioSection />
      <Footer />
    </div>
  );
};

export default Index;
