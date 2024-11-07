import React from "react";
import SkillBox from "./SkillBox";
// motion
import { motion } from "framer-motion";
// vartants
import { fadeIn } from "../utils/variants";
import GradientBtn from "./GradientBtn";
// services data
// import services from "./serviceData";
const Services = () => {
  const services = [
    {
      id: 1,
      name: "Web Development",
      description:
        "Web development entails designing, coding, and constructing websites or web applications, combining elements like layout, functionality, and user interactivity. Developers utilize programming languages and technologies to create responsive and dynamic digital platforms that cater to diverse user needs, ultimately shaping the digital presence of businesses and individuals on the internet.",
      link: "Learn more",
    },
    {
      id: 2,
      name: "UI/UX Design",
      description:
        "UX/UI design involves crafting user experiences (UX) and user interfaces (UI) to ensure seamless interactions between people and digital products. UX design focuses on user journey, usability, and satisfaction, while UI design emphasizes visual elements, aesthetics, and intuitive interfaces. Together, they create compelling and user-friendly digital solutions that prioritize both functionality and aesthetics, enhancing overall user engagement and satisfaction.",
      link: "Learn more",
    },
    {
      id: 3,
      name: "Digital Marketing",
      description:
        "Digital marketing is a dynamic realm of strategic online engagement, crafting brand narratives with precision. It harnesses virtual channels to target, captivate, and convert audiences, igniting growth with data-driven finesse. Through SEO, social media, and email campaigns, it amplifies reach, fostering meaningful connections in the digital landscape. In this fluid dance of pixels and algorithms, businesses sculpt their online presence, orchestrating success in the age of screens.",
      link: "Learn more",
    },
  ];

  return (
    <section className="section mt-0 lg:mb-24" id="service">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* text & image */}
          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 lg:bg-services lg:bg-bottom bg-no-repeat
    mix-blend-lighten mb-12 lg:mb-0"
          >
            <h2 className="h2 text-accent mb-6 font-bold">What I Do. </h2>
            <div className="font-semibold max-w-[455px] mb-16">
              {/* I'm a Freelance Front-end Developer with over 5 years of
              experience. */}
              I am passionate about Software Engineering, Web Development,
              Designing and Digital Marketing.
            </div>
            <GradientBtn content="See my work" link="#work" />
          </motion.div>
          {/* services */}
          <motion.div
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1"
          >
            {/* service list */}
            <div>
              {services.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <SkillBox {...item} link="#" />
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
