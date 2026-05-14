import {Hero} from "@/components/sections/Hero";
import {Problem} from "@/components/sections/Problem";
import {HowItWorks} from "@/components/sections/HowItWorks";
import {Features} from "@/components/sections/Features";
import {UseCases} from "@/components/sections/UseCases";
import {Demo} from "@/components/sections/Demo";
import {Pricing} from "@/components/sections/Pricing";
import {FAQ} from "@/components/sections/FAQ";
import {FinalCTA} from "@/components/sections/FinalCTA";

export default function HomePage() {
    return (
        <>
            <Hero/>
            <Problem/>
            <HowItWorks/>
            <Features/>
            <UseCases/>
            <Demo/>
            <Pricing/>
            <FAQ/>
            <FinalCTA/>
        </>
    );
}
