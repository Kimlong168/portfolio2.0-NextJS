import React from "react";

interface GradientBtnProps {
  content: string; // The text that will be displayed inside the button
  link?: string; // The URL to which the button will link
}

const GradientBtn: React.FC<GradientBtnProps> = ({ content, link = null }) => {
  if (link) {
    return (
      <a href={link}>
        <button className="btn btn-sm">{content}</button>
      </a>
    );
  }
  return <button className="btn btn-sm">{content}</button>;
};

export default GradientBtn;
