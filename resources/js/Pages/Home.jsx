import React from "react";
import Hero from "../UI/Hero";

import FAQ from "../UI/Faq";
import Footer from "../Components/Footer";
import WhoDugong from "@/UI/WhoDugong";
import Populasi from "@/UI/Populasi";
import Habitat from "@/UI/Habitat";
import LaporSection from "@/UI/LaporSection";

const Home = () => {
    return (
        <>
            <Hero />
            <WhoDugong />
            <Populasi />
            <Habitat />
            <LaporSection />
            <FAQ />
            <Footer />
        </>
    );
};

export default Home;
