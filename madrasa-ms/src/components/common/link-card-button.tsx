"use client";

import * as React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkCardButtonProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

export default function LinkCardButton({
  href,
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
  onClick,
}: LinkCardButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-background p-6 shadow-lg border transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer block",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-15 w-15 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md group-hover:scale-110 transition-transform",
            iconClassName
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      </div>
      {/* Decorative element */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
    </Link>
  );
}
