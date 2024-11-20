import React from "react";
// motion
import { motion } from "framer-motion";
// variants
import { fadeIn } from "../utils/variants";
// robot image (import the uploaded file)
import RobotImage from "../assets/robot.png";
import Image from "next/image";
import Link from "next/link";

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 min-h-screen">
        {/* Contact Info */}
        <motion.div
          className="flex-1"
          variants={fadeIn("right", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="h2 text-accent mb-6 font-bold">Contact Me.</h2>
          <address className="text-gradient btn-link max-w-max">
            Phnom Penh, Cambodia
          </address>
          <div className="italic text-gradient btn-link transition-all max-w-max">
            <a href={`mailto:kimlong5244@gmail.com`}>kimlong5244@gmail.com</a>
          </div>
          <div className="italic text-gradient btn-link transition-all max-w-max">
            <a href="https://t.me/kimlong_chann">855 86 961 256</a>
          </div>
        </motion.div>

        {/* Robot Animation */}

        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {" "}
          <Link href="https://t.me/kimlongchann_bot">
            <div className="animate-bounce cursor-pointer">
              <Image
                src={RobotImage}
                alt="Digital Assistant Robot"
                className="w-full max-w-[300px] mx-auto animate-pulse"
              />{" "}
            </div>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-[130px] -right-[100px] md:-top-[80px] md:-right-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-4 py-2 shadow-lg max-w-[200px] md:text-center"
          >
            Hey, I am his digital assistant. I can help you get to know him.
            <br />
            <Link
              href="https://t.me/kimlongchann_bot"
              className="underline underline-thickness-thin"
            >
              Click here!
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
