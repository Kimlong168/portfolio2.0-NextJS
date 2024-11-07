import React from "react";
// countup
import CountUp from "react-countup";
interface CountUpNumberProps {
  inView: boolean; // Boolean indicating if the component is in the viewport
  start: number; // The start value for the count up
  end: number; // The end value for the count up
  duration: number; // The duration over which to count up
  text1: string; // Optional text before the number
  text2: string; // Optional text after the number
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({
  inView,
  start,
  end,
  duration,
  text1,
  text2,
}) => {
  return (
    <div>
      <div className="text-[40px] font-tertiary text-gradient mb-2">
        {inView ? <CountUp start={start} end={end} duration={duration} /> : "0"}
      </div>
      <div className="font-primary text-sm tracking-[2px]">
        {text1}
        <br />
        {text2}
      </div>
    </div>
  );
};

export default CountUpNumber;
