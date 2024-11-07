import { useEffect, useState } from "react";
import Aba from "./Aba";
const DateAndTime = () => {
  const [showQrCode, setShowQrCode] = useState(false);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your birthday date and time here
  const birthdayDate: Date = new Date("2024-03-11T00:00:00");

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
      } else {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex justify-center items-center section"
      onClick={() => {
        setShowQrCode((prev) => !prev);
      }}
    >
      <div className="mx-3 sm:p-10 p-4 rounded-md flex justify-center flex-col gap-6 shadow-[5px_5px_50px_rgba(47,46,60,1)] w-full md:w-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-center sm:text-3xl text-xl font-semibold leading-8 text-[#FBFAF8]">
            My upcoming birthday &#x1F381;
          </h1>
          <span className="text-sm font-semibold text-center leading-8 text-[#959AAE]">
            Guys, I always accept pre-birthday gifts. Click here
          </span>
        </div>
        <div className="flex justify-between sm:px-4">
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
              {countdown.hours > 9 ? countdown.hours : "0" + countdown.hours}
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
        <small className="text-center block mx-auto"> 📆 2024, 11 March</small>
      </div>
      {showQrCode && <Aba setShowQrCode={setShowQrCode} />}
    </div>
  );
};
export default DateAndTime;
