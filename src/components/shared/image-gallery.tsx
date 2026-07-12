"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZooming(false);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-6">
      {/* Left: Main Image + Thumbnails */}
      <div className="space-y-4">
        {/* Main Image Container */}
        <div
          ref={imageContainerRef}
          className={cn(
            "relative aspect-square rounded-xl overflow-hidden bg-muted cursor-crosshair select-none",
            isZooming && "ring-2 ring-primary ring-offset-2",
          )}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={images[selected]}
            alt={`${title} - Image ${selected + 1}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {selected + 1} / {images.length}
            </div>
          )}
          {/* Zoom hint */}
          {!isZooming && (
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity lg:opacity-100">
              Hover to zoom
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0",
                  i === selected
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Zoom Panel (desktop only) */}
      <div className="hidden lg:block">
        <div
          className={cn(
            "relative aspect-square rounded-xl overflow-hidden border bg-muted transition-opacity duration-200",
            isZooming ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <Image
            src={images[selected]}
            alt={`${title} zoomed`}
            fill
            className="object-cover will-change-transform"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isZooming ? "scale(2.5)" : "scale(1)",
              transition:
                "transform-origin 0.1s ease-out, transform 0.15s ease-out",
            }}
            sizes="600px"
          />

          {/* Crosshair overlay on zoom panel */}
          {isZooming && (
            <div
              className="absolute pointer-events-none z-10"
              style={{
                left: `${zoomPos.x}%`,
                top: `${zoomPos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Vertical line */}
              <div className="absolute w-px h-full bg-black/10 -translate-x-1/2 -translate-y-0 left-1/2 top-0" />
              {/* Horizontal line */}
              <div className="absolute h-px w-full bg-black/10 -translate-y-1/2 -translate-x-0 top-1/2 left-0" />
              {/* Center dot */}
              <div className="w-2.5 h-2.5 rounded-full border border-white/80 bg-black/20 backdrop-blur-[1px]" />
            </div>
          )}

          {/* Placeholder when not zooming */}
          {!isZooming && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <svg
                  className="w-12 h-12 mx-auto mb-2 opacity-30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3-8.6-8.6-18 0-18-18 18h18" />
                  <circle cx="11" cy="11" r="4" />
                </svg>
                <p className="text-xs font-medium">Hover over image to zoom</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
