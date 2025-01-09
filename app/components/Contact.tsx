"use client";
import React, { useState } from "react";
// import { Link } from "react-scroll";
// motion
// import { motion } from "framer-motion";
// // variants
// import { fadeIn } from "../utils/variants";
// // robot image (import the uploaded file)
// import RobotImage from "../assets/robot.png";
// import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { FaGithub, FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { RxLinkedinLogo } from "react-icons/rx";
import { BsRobot } from "react-icons/bs";
import GradientBtn from "./GradientBtn";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    if (!formData.message) {
      enqueueSnackbar("Pleaes input message to send!", {
        variant: "error", // Options: success, error, warning, info, default
        autoHideDuration: 1500, // Optional: Time in ms before the notification hides
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    // Example: Send data to an API endpoint
    try {
      await sendTelegramMessage(
        `
    *New Message Received!*
      
    👤 *Name:* ${formData.name}
    📧 *Email:* ${formData.email}
    📋 *Subject:* ${formData.subject}
      
    📝 *Message:*
      ${formData.message}
      `
      );

      enqueueSnackbar("Message sent successfully!", {
        variant: "success", // Options: success, error, warning, info, default
        autoHideDuration: 1500, // Optional: Time in ms before the notification hides
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });

      // Clear form data
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Error sending message!", {
        variant: "error", // Options: success, error, warning, info, default
        autoHideDuration: 3000, // Optional: Time in ms before the notification hides
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  const sendTelegramMessage = async (message: string): Promise<void> => {
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      await axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      });

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    // <section id="contact" className="section">
    //   <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 min-h-screen">
    //     {/* Contact Info */}
    //     <motion.div
    //       className="flex-1"
    //       variants={fadeIn("right", 0.6)}
    //       initial="hidden"
    //       whileInView={"show"}
    //       viewport={{ once: false, amount: 0.3 }}
    //     >
    //       <h2 className="h2 text-accent mb-6 font-bold">Contact Me.</h2>
    //       <address className="text-gradient btn-link max-w-max">
    //         Phnom Penh, Cambodia
    //       </address>
    //       <div className="italic text-gradient btn-link transition-all max-w-max">
    //         <a href={`mailto:kimlong5244@gmail.com`}>kimlong5244@gmail.com</a>
    //       </div>
    //       <div className="italic text-gradient btn-link transition-all max-w-max">
    //         <a href="https://t.me/kimlong_chann">855 86 961 256</a>
    //       </div>
    //     </motion.div>

    //     {/* Robot Animation */}

    //     <motion.div
    //       className="flex-1 relative"
    //       initial={{ opacity: 0, x: 100 }}
    //       animate={{ opacity: 1, x: 0 }}
    //       transition={{ duration: 1 }}
    //     >
    //       {" "}
    //       <Link href="https://t.me/kimlongchann_bot">
    //         <div className="animate-bounce cursor-pointer">
    //           <Image
    //             src={RobotImage}
    //             alt="Digital Assistant Robot"
    //             className="w-full max-w-[300px] mx-auto animate-pulse"
    //           />{" "}
    //         </div>
    //       </Link>
    //       <motion.div
    //         initial={{ opacity: 0, y: -10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{
    //           duration: 1,
    //           delay: 1,
    //           repeat: Infinity,
    //           repeatType: "reverse",
    //         }}
    //         className="absolute -top-[130px] -right-[100px] md:-top-[80px] md:-right-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-4 py-2 shadow-lg max-w-[200px] md:text-center"
    //       >
    //         Hey, I am his digital assistant. I can help you get to know him.
    //         <br />
    //         <Link
    //           href="https://t.me/kimlongchann_bot"
    //           className="underline underline-thickness-thin"
    //         >
    //           Click me!
    //         </Link>
    //       </motion.div>
    //     </motion.div>
    //   </div>
    // </section>
    <>
      <section id="contact" className="section mb-20 md:mb-5">
        <div className="grid sm:grid-cols-2 items-center gap-16 p-5 mx-auto max-w-4xl  rounded-md ">
          <div>
            <h1 className="h2 leading-tight text-accent font-bold ">
              Let&apos;s Talk
            </h1>
            <p className="text-sm text-gray-400 mt-3">
              I&apos;m always excited to connect, collaborate, or discuss new
              opportunities. Whether you have a question, a project idea, or
              just want to say hello, feel free to reach out!
            </p>
            <div className="mt-12">
              <h2 className="text-lg font-extrabold">Telegram Bot</h2>
              <ul className="mt-3">
                <Link
                  href="https://t.me/kimlongchann_bot"
                  className="flex items-center group"
                >
                  <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <BsRobot color="black" />
                  </div>
                  <div className="text-accent text-sm ml-3">
                    <small className="block">Bot</small>
                    <div className="text-sm text-[#eee] group-hover:text-blue-500 group-hover:underline">
                      @kimlongchann_bot
                    </div>
                  </div>
                </Link>
              </ul>
            </div>
            <div className="mt-12">
              <h2 className="text-lg font-extrabold">Social Media</h2>
              <ul className="flex mt-3 space-x-4">
                <Link href="https://github.com/Kimlong168" className="text-2xl">
                  <FaGithub />
                </Link>
                <Link
                  href="https://www.facebook.com/phnompenhcrown.fc.7?mibextid=ZbWKwL"
                  className="text-2xl"
                >
                  <FaFacebook />
                </Link>
                <Link
                  href="https://www.instagram.com/__kimlong/"
                  className="text-2xl"
                >
                  <FaInstagram />
                </Link>
                <Link href="https://t.me/kimlongchann_bot" className="text-2xl">
                  <FaTelegram />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/chann-kimlong-267073282/?originalSubdomain=kh"
                  className="text-2xl"
                >
                  <RxLinkedinLogo />
                </Link>{" "}
              </ul>
            </div>
          </div>

          <form className="ml-auo space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-accent bg-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-accent bg-transparent"
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              onChange={handleInputChange}
              value={formData.subject}
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-accent bg-transparent"
            />
            <textarea
              placeholder="Message (required)"
              name="message"
              rows={6}
              onChange={handleInputChange}
              value={formData.message} // Controlled value
              className="w-full rounded-md px-4 border text-sm pt-2.5 outline-accent bg-transparent"
            />

            <button className="flex justify-end">
              <GradientBtn content="Send Message" />
            </button>
          </form>
        </div>
      </section>
      <SnackbarProvider />
    </>
  );
};

export default Contact;
