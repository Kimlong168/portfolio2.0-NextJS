import React from "react";
// motion
import { motion } from "framer-motion";
// vartants
import { fadeIn } from "../utils/variants";
// icons

const Contact = () => {
  return (
    <section
      id="contact"
      className="section mt-[500px] mb-[500px] lg:mb-[120px]"
    >
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("right", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="h2 text-accent mb-6 font-bold">Contact Me. </h2>
          <address className="text-gradient btn-link max-w-max ">
            Phnom Penh, Cambodia
          </address>
          <div className="italic text-gradient btn-linktransition-all max-w-max ">
            <a href={`mailto:kimlong5244@gmail.com`}>kimlong5244@gmail.com</a>
          </div>
          <div className="italic text-gradient btn-link transition-all max-w-max ">
            <a href="https://t.me/kimlong_chann">855 86 961 256</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
