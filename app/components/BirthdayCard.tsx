"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useEffect, useState } from "react";
import Aba from "./Aba";
import Buble from "./Buble";
const BirthdayCard = () => {
  return (
    <div className="grid w-full place-content-center px-4 py-12 text-white">
      <TiltCard />
    </div>
  );
};

const TiltCard = () => {
  const [isMyBirthday, setIsMyBirthday] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  //   card

  const [showQrCode, setShowQrCode] = useState(false);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your birthday date and time here
  const year = new Date().getFullYear();
  const birthdayDate: Date = new Date(`${year}-03-11T00:00:00`);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeUntilBirthday = birthdayDate.getTime() - now;

      if (timeUntilBirthday > 0) {
        const days = Math.floor(timeUntilBirthday / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeUntilBirthday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeUntilBirthday % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeUntilBirthday % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });

        // show the birthday message when the time comes
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          setIsMyBirthday(true);
        }
      } else {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative h-96 rounded-xl"
        onClick={() => {
          setShowQrCode((prev) => !prev);
        }}
      >
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="grid place-content-center rounded-xl shadow-lg  p-3"
        >
          {isMyBirthday ? (
            <div className="flex items-center justify-center w-full rounded-lg border-dashed h-screen relative">
              <span className="text-9xl font-extrabold not-italic bg-clip-text text-transparent bg-gradient-to-br from-rose-500 to-rose-600 animate-rainbow">
                Happy Birthday to me
                <div className="animate-ping">
                  <Buble />
                </div>
                <div className="animate-pulse">
                  <Buble />
                </div>
                <div className="animate-spin">
                  <Buble />
                </div>
                <div className="animate-bounce ease-in-out">
                  <Buble />
                </div>
              </span>
              <div className="animate-ping">
                <Buble />
              </div>

              <div className="animate-ping ease-in-out">
                <Buble />
              </div>
              <div className="animate-bounce">
                <Buble />
              </div>

              <div className="animate-bounce">
                <Buble />
              </div>
              <div className="animate-bounce">
                <Buble />
              </div>
              <div className="animate-bounce">
                <Buble />
              </div>

              <div className="animate-pulse ease-in-out">
                <Buble />
              </div>
              <div className="animate-pulse">
                <Buble />
              </div>
              <div className="animate-pulse">
                <Buble />
              </div>
              <div className="animate-pulse">
                <Buble />
              </div>
              <div className="animate-ping">
                <Buble />
              </div>
              <div className="animate-ping">
                <Buble />
              </div>

              <Buble />
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center md:w-[430px] cursor-pointer ">
                <div className="sm:p-10 p-6 rounded-md flex justify-center flex-col gap-6 shadow-[5px_5px_50px_rgba(47,46,60,1)] w-full md:w-auto bg-black">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-center sm:text-3xl text-xl font-semibold leading-8 text-[#FBFAF8]">
                      My upcoming birthday &#x1F381;
                    </h1>
                    <span className="text-sm font-semibold text-center leading-8 text-[#959AAE]">
                      Guys, I always accept pre-birthday gifts. Click here
                    </span>
                  </div>
                  <div className="flex justify-center sm:px-4 gap-4">
                    <div className="flex flex-col justify-center items-center gap-3">
                      <span className="py-3 px-3 flex justify-center items-center bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
                        {countdown.days}
                      </span>
                      <span className="text-sm text-[#FBFAF8] font-bold">
                        {countdown.days == 1 ? "Day" : "Days"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
                        {/* {countdown.hours} */}
                        {countdown.hours > 9
                          ? countdown.hours
                          : "0" + countdown.hours}
                      </span>
                      <span className="text-sm text-[#FBFAF8] font-bold">
                        {countdown.hours == 1 ? "Hour" : "Hours"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
                        {/* {countdown.minutes} */}
                        {countdown.minutes > 9
                          ? countdown.minutes
                          : "0" + countdown.minutes}
                      </span>
                      <span className="text-sm text-[#FBFAF8] font-bold">
                        {countdown.minutes == 1 ? "Minute" : "Minutes"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
                        {countdown.seconds > 9
                          ? countdown.seconds
                          : "0" + countdown.seconds}
                      </span>
                      <span className="text-sm text-[#FBFAF8] font-bold">
                        {countdown.seconds == 1 ? "Second" : "Seconds"}
                      </span>
                    </div>
                  </div>
                  <small className="text-center block mx-auto">
                    📆 2024, 11 March
                  </small>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
      <div
        onClick={() => {
          setShowQrCode((prev) => !prev);
        }}
      >
        {showQrCode && <Aba />}
      </div>
    </>
  );
};

export default BirthdayCard;
