"use client";
import { useEffect, useState } from "react";

export default function QiblaCompass() {
  const [qibla, setQibla] = useState<number | null>(null);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const q = getQiblaDirection(pos.coords.latitude, pos.coords.longitude);
      setQibla(q);
    });

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha != null) {
        setHeading(event.alpha);
      }
    };

    window.addEventListener("deviceorientationabsolute", handleOrientation);
    return () =>
      window.removeEventListener(
        "deviceorientationabsolute",
        handleOrientation
      );
  }, []);

  if (qibla === null) return <p>Menghitung arah kiblat...</p>;

  const rotation = qibla - heading;

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-48 h-48 border-4 border-gray-400 rounded-full flex items-center justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        🕋
      </div>
      <p className="mt-4 text-sm">
        Arah Kiblat: {Math.round(qibla)}° dari utara
      </p>
    </div>
  );
}

function getQiblaDirection(lat: number, lon: number) {
  const kaabaLat = (21.4225 * Math.PI) / 180;
  const kaabaLon = (39.8262 * Math.PI) / 180;
  const userLat = (lat * Math.PI) / 180;
  const userLon = (lon * Math.PI) / 180;

  const deltaLon = kaabaLon - userLon;
  const y = Math.sin(deltaLon);
  const x =
    Math.cos(userLat) * Math.tan(kaabaLat) -
    Math.sin(userLat) * Math.cos(deltaLon);
  const bearing = Math.atan2(y, x);

  return (bearing * 180) / Math.PI + (360 % 360);
}
