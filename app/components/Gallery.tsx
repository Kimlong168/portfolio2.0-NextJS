"use client";
import { useAnimate } from "framer-motion";
import React, { useRef } from "react";
import { FiMousePointer } from "react-icons/fi";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";
import gallery7 from "../assets/gallery7.jpg";
import gallery8 from "../assets/gallery8.jpg";
import gallery9 from "../assets/gallery9.jpg";
import gallery10 from "../assets/gallery10.jpg";
import gallery11 from "../assets/gallery11.jpg";
import gallery12 from "../assets/gallery12.jpg";
import gallery13 from "../assets/gallery13.jpg";
import gallery14 from "../assets/gallery14.jpg";
import gallery15 from "../assets/gallery15.jpg";
import gallery16 from "../assets/gallery16.jpg";
import gallery17 from "../assets/gallery17.jpg";
import gallery18 from "../assets/gallery18.jpg";
import diverse1 from "../assets/diverse1.jpg";
import diverse2 from "../assets/diverse2.jpg";
import diverse3 from "../assets/diverse3.jpg";
import diverse4 from "../assets/diverse4.jpg";
import Image, { StaticImageData } from "next/image";

// Gallery component
const Gallery: React.FC = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        gallery1,
        gallery2,
        gallery3,
        gallery4,
        gallery5,
        gallery6,
        gallery7,
        gallery8,
        gallery9,
        gallery10,
        gallery11,
        gallery12,
        gallery13,
        gallery14,
        gallery15,
        gallery16,
        gallery17,
        gallery18,
        diverse1,
        diverse2,
        diverse3,
        diverse4,
      ]}
    >
      <section className="grid h-screen w-full place-content-center">
        <p className="flex items-center gap-2 text-3xl font-bold uppercase text-white">
          <FiMousePointer />
          <span>Hover me</span>
        </p>
      </section>
    </MouseImageTrail>
  );
};

// Props interface for MouseImageTrail component
interface MouseImageTrailProps {
  children: React.ReactNode; // React node to allow any child component or elements
  images: (string | StaticImageData)[]; // Array of image URLs or StaticImageData
  renderImageBuffer: number; // Buffer for the number of images to render
  rotationRange: number; // The range of rotation for the images
}

// MouseImageTrail component
const MouseImageTrail: React.FC<MouseImageTrailProps> = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageRenderCount = useRef<number>(0);

  // Handle mouse movement to trigger image rendering
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  // Calculate distance between two points
  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  // Render the next image at the mouse position
  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector<HTMLElement>(selector);
    if (el) {
      el.style.top = `${lastRenderPosition.current.y}px`;
      el.style.left = `${lastRenderPosition.current.x}px`;
      el.style.zIndex = imageRenderCount.current.toString();

      const rotation = Math.random() * rotationRange;

      animate(
        selector,
        {
          opacity: [0, 1],
          transform: [
            `translate(-50%, -25%) scale(0.5) ${
              imageIndex % 2
                ? `rotate(${rotation}deg)`
                : `rotate(-${rotation}deg)`
            }`,
            `translate(-50%, -50%) scale(1) ${
              imageIndex % 2
                ? `rotate(-${rotation}deg)`
                : `rotate(${rotation}deg)`
            }`,
          ],
        },
        { type: "spring", damping: 15, stiffness: 200 }
      );

      animate(
        selector,
        {
          opacity: [1, 0],
        },
        { ease: "linear", duration: 0.5, delay: 5 }
      );

      imageRenderCount.current += 1;
    }
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <Image
          width={600} 
          height={400}
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={typeof img === "string" ? img : img.src}
          key={index}
          data-mouse-move-index={index}
          alt="gallery"
        />
      ))}
    </div>
  );
};

export default Gallery;
