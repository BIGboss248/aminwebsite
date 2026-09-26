"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MapPin, Navigation, Crosshair, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GeoLocationMapProps } from "./GeoLocationMap.types";

/**
 * Geolocation Vector HUD & Map Visualizer (`GeoLocationMap`).
 */
export function GeoLocationMap({
  locale = "en",
  data,
  isLoading = false,
  className = "",
  ...rest
}: GeoLocationMapProps): React.JSX.Element {
  const t = useTranslations("lab.ipinfo.map");

  const lat = data?.latitude ?? 0;
  const lon = data?.longitude ?? 0;
  const city = data?.city ?? "";
  const country = data?.country ?? "";

  // Convert lat/lon to percentage in equirectangular projection
  // Longitude: -180 to 180 -> 0% to 100%
  // Latitude: 90 to -90 -> 0% to 100%
  const pinX = Math.max(5, Math.min(95, ((lon + 180) / 360) * 100));
  const pinY = Math.max(5, Math.min(95, ((90 - lat) / 180) * 100));

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs transition-colors",
        className,
      )}
      {...rest}
    >
      {/* Header Row with flex-wrap */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-border/50 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <MapPin className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-base font-bold text-foreground tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20"
          dir="ltr"
        >
          <Radio className="size-3 text-primary animate-pulse" aria-hidden="true" />
          <span>{t("live_vector_tag")}</span>
        </div>
      </div>

      {/* Interactive Cybernetic Map HUD Canvas */}
      <div className="relative w-full h-56 sm:h-72 rounded-xl bg-slate-950 dark:bg-black/90 border border-border/80 overflow-hidden flex items-center justify-center">
        {/* World Grid Lines Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none stroke-primary/30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="geo-grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo-grid-pattern)" />
          {/* Equator & Prime Meridian Axis */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Global Continents Vector Silhouette */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary/40 select-none">
            [ EQUIRECTANGULAR BGP TOPOLOGY GRID ]
          </span>
        </div>

        {/* Target Pinpoint Marker */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 pointer-events-none"
          style={{ left: `${pinX}%`, top: `${pinY}%` }}
        >
          {/* Radar Waves */}
          <div className="absolute -inset-4 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute -inset-2 rounded-full bg-primary/40 animate-pulse" />

          {/* Focal Point */}
          <div className="relative flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/50">
            <Crosshair className="size-3.5" aria-hidden="true" />
          </div>

          {/* Location Float Pill */}
          <div className="absolute left-1/2 top-7 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-primary/40 text-primary-foreground text-[11px] font-mono whitespace-nowrap shadow-md" dir="ltr">
            {city ? `${city}, ` : ""}{country || "Lat/Lon Vector"}
          </div>
        </div>

        {/* HUD Overlay Info Bottom Left */}
        <div className="absolute bottom-3 start-3 z-10 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-md border border-border/70 text-xs font-mono space-y-0.5">
          <div className="text-muted-foreground flex items-center gap-1.5">
            <Navigation className="size-3 text-primary" aria-hidden="true" />
            <span>{t("coordinates_label")}:</span>
          </div>
          <div className="text-foreground font-semibold" dir="ltr">
            {lat.toFixed(4)}°, {lon.toFixed(4)}°
          </div>
        </div>
      </div>

      {/* Explanatory Notice */}
      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
        {t("approx_notice")}
      </p>
    </div>
  );
}

export default GeoLocationMap;
