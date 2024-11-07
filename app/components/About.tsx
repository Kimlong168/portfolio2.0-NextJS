"use client";
import React from "react";
import GradientBtn from "./GradientBtn";
import CVOption from "./CVOption";
// intersection observer hook
import { useInView } from "react-intersection-observer";
// motion
import { motion } from "framer-motion";
// vartant
import { fadeIn } from "../utils/variants";
import CountUpNumber from "./CountUpNumber";
import { useState } from "react";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const [showCVOption, setShowCVOption] = useState(false);
  return (
    <section id="about" className="section mb-0 lg:mb-24 " ref={ref}>
      <div className="container mx-auto">
        {/* image */}
        {/* <motion.div
          className="mx-auto lg:hidden"
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <Image
            width={500}
            height={500}
            className="rounded-full"
            src="https://firebasestorage.googleapis.com/v0/b/news-project-aa768.appspot.com/o/kimlong.jpg?alt=media&token=8fa60274-4ece-4cd8-b91a-fda5cb9466c6"
            alt={"kimlong"}
          />
        </motion.div> */}

        <div className="flex flex-col gap-y-10 lg:flex-row lg:items-center lg:gap-x-20 lg:gap-y-0 min-h-screen">
          {/* img */}
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="block rounded-full overflow-hidden border-b-2 border-pink-500 flex-1 bg-about bg-cover bg-no-repeat min-h-[500px] h-[640px]  mix-blend-lighten bg-top"
          ></motion.div>
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1"
          >
            {/* text */}
            <div>
              <h2 className="text-accent h2 font-bold mt-5">About me.</h2>
              <div className="mb-4 font-semibold">
                {/* I'm a Freelance Front-end Developer with over 5 years of
                experience. */}
                I am a fourth-year student majoring in Computer Science at the
                CADT, specializing in Software Engineering.
              </div>
            </div>
            <p className="mb-6">
              Hi there, My name is Chann Kimlong. I am a web developer. I can
              provide clean code and pixel perfect design. I also make the
              website more & more interactive with web animations. A responsive
              design makes your website accessible to all users,regardless of
              their device. You can contact me whenever you need help, i will
              try my best to deal with your problem as much as possible.
            </p>
            {/* stats */}
            <div className="flex gap-x-6 lg:gap-x-10 mb-12">
              <CountUpNumber
                inView={inView}
                start={0}
                end={4}
                duration={3}
                text1="years of"
                text2="Experience"
              />
              <CountUpNumber
                inView={inView}
                start={0}
                end={30}
                duration={3}
                text1="Side Project"
                text2="Completed"
              />
              <CountUpNumber
                inView={inView}
                start={0}
                end={3}
                duration={3}
                text1="Real"
                text2="Projects"
              />
            </div>
            <div className="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0">
              {/* <GradientBtn
                content="Contact me"
                link="https://t.me/kimlong_chann"
              />
              <a
                href="https://t.me/kimlong_chann"
                className="text-gradient btn-link"
              >
                My Portfolio
              </a> */}
              <div onClick={() => setShowCVOption(true)}>
                <GradientBtn content="Download MY CV" link="#" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {showCVOption && <CVOption setShowCVOption={setShowCVOption} />}
    </section>
  );
};
export default About;
