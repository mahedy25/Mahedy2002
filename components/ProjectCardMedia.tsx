"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "../sanity/lib/image";
import { useState } from "react";
import { EyeOpenIcon } from "@sanity/icons";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-orbitron",
});

interface ProjectCardMediaProps {
  slug: string;
  title: string | null;
  demoVideo?: { asset?: { url?: string } } | null;
  coverImage?: any | null;
}

export default function ProjectCardMedia({
  slug,
  title,
  demoVideo,
  coverImage,
}: ProjectCardMediaProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link
      href={`/projects/${slug}`}
      className="relative block z-10"
      aria-label={`Open case study for ${title}`}
    >
      <div
        className="relative aspect-video overflow-hidden bg-muted rounded-t-lg"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* VIDEO / IMAGE */}
        {demoVideo?.asset?.url ? (
          <video
            src={demoVideo.asset.url}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          coverImage && (
            <Image
              src={urlFor(coverImage).width(600).height(400).url()}
              alt={title ?? "Project image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
            />
          )
        )}

        {/* FOLLOW POINTER INDICATOR */}
        {hovered && (
          <>
            <motion.div
              className="w-12 h-12 border-2 border-[#C41E3A] rounded-full flex items-center justify-center bg-black/30 text-white text-sm font-bold absolute"
              style={{
                left: mousePos.x  -24 , // center the circle
                top: mousePos.y - 24,
              }}
              animate={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.3, repeat: 0 }}
            >
              <EyeOpenIcon className="w-6 h-6" />
            </motion.div>

            <motion.div
  className={`${orbitron.className} absolute flex flex-col items-center justify-center px-4 py-2 bg-[#C41E3A] text-white font-semibold pointer-events-none uppercase rounded-lg text-sm`}
  style={{
    left: mousePos.x -40,
    top: mousePos.y -55,
    transform: 'translate(-50%, -50%)',
  }}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
 OPEN
</motion.div>








          </>
        )}
      </div>
    </Link>
  );
}
