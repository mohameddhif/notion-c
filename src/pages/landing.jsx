import Navbar from "../components/landingPage/Navbar";
import HeroSection from "../components/landingPage/HeroSection";
import FeatureSection from "../components/landingPage/FeatureSection";
import Workflow from "../components/landingPage/Workflow";
import Footer from "../components/landingPage/Footer";
import Pricing from "../components/landingPage/Pricing";
import FAQ from "../components/landingPage/faq";
import { Outlet } from "react-router-dom";

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
        <Outlet />
      </div>
    </>
  );
};

export default LandingPage;
