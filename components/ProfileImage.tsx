"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileImage({
  imageUrl,
  firstName,
  lastName,
}: ProfileImageProps) {
  const { isSignedIn } = useUser();

  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 w-full">
      <Image
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        fill
        className="object-contain"
        priority
      />

      {/* Online Badge */}
      {isSignedIn && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-medium text-white">Online</span>
        </div>
      )}
    </div>
  );
}
