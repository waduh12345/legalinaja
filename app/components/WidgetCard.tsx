"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WidgetCardProps {
  type: "prayer" | "activity";
  title: string;
  subtitle: string;
  time?: string;
  status?: "current" | "upcoming" | "completed";
  activity?: string;
  icon: React.ReactNode;
}

export default function WidgetCard({
  type,
  title,
  subtitle,
  time,
  status,
  activity,
  icon,
}: WidgetCardProps) {
  return (
    <Card className="border-awqaf-border-light hover:shadow-md transition-all duration-200 h-full relative">
      {/* Status Badge - Positioned absolutely at top right */}
      {status && (
        <Badge
          variant={status === "current" ? "default" : "secondary"}
          className={`
            absolute -top-1 -right-1 z-10 text-xs px-2 py-1 shadow-sm
            ${
              status === "current"
                ? "bg-success text-white"
                : "bg-accent-100 text-awqaf-primary"
            }
          `}
        >
          {status === "current"
            ? "Now"
            : status === "upcoming"
            ? "Next"
            : "Done"}
        </Badge>
      )}

      <CardContent className="p-3 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground text-xs font-comfortaa leading-tight">
              {title}
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary font-comfortaa leading-tight mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-center">
          {type === "prayer" && time && (
            <div className="text-center">
              <div className="text-xl font-bold text-awqaf-primary font-comfortaa">
                {time}
              </div>
              <p className="text-xs text-awqaf-foreground-secondary font-comfortaa mt-1">
                Waktu Sholat
              </p>
            </div>
          )}

          {type === "activity" && activity && (
            <div className="text-center">
              <div className="text-sm font-medium text-card-foreground font-comfortaa leading-tight">
                {activity}
              </div>
              <p className="text-xs text-awqaf-foreground-secondary font-comfortaa mt-1">
                Aktivitas Terakhir
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
