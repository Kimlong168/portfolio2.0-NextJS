import React from "react";
import diverse1 from "../assets/diverse1.jpg";
import techo from "../assets/techoImg.jpg";
import winner from "../assets/winner.jpg";
import gradeA from "../assets/gradeA.jpg";
import access from "../assets/access.png";
import i4d from "../assets/i4d.jpg";
import ShowAchievement from "./ShowAchievement";
const Achievement = () => {
  return (
    <div className="container mx-auto mt-32">
      <h2 className="h2 leading-tight text-accent font-bold">
        My Achievements.
      </h2>
      <p className="max-w-sm mb-16">These showcase some of my achievements.</p>
      {/* box of achievement */}

      <div className="flex flex-col gap-24 ">
        <ShowAchievement
          image={access}
          title="Access Microscholarship Program 2019 (FY17)"
          description="This shcolarship was provided by US Embassy Phnom Penh. I studied English for 2 years."
        />
        <ShowAchievement
          image={gradeA}
          title="Bacll 2021 - Grade A"
          description="I studied at Chamroeun Vichea High School from 2018-2021. I got grade A in national exam 2021."
        />
        <ShowAchievement
          image={techo}
          title="Techo scholarship 2021"
          description="I got Techo Scholarhaip 2021 to study at CAMBODIA ACADEMY OF DIGITAL TECHNOLOGY (CADT)."
        />

        <ShowAchievement
          image={diverse1}
          title="Nava-Thon Champoin 2023"
          description="This is the first time I joined Nava-Thon. I got the first place in the competition."
        />
        
        <ShowAchievement
          image={i4d}
          title="I4D 2.0 - 2024"
          description="Top 10 final selected cadidates of I4D 2.0."
        />

        <ShowAchievement
          image={winner}
          title="CADT CUP 2022 & 2023"
          description="We are the first runner up of CADT-CUP 2023 and the second runner up of CADT-CUP 2022."
        />
      </div>
    </div>
  );
};

export default Achievement;
