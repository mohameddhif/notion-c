import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import Workflow from "../components/Workflow";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/faq";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
