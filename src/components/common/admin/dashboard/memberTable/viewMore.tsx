"use client";
import { ADMIN_DIRECTORY } from "@/constants/route-constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ViewMore({ id }: { id: string }) {
  return (
    <div className="flex justify-center">
      <Link
        href={`${ADMIN_DIRECTORY}/${id}`}
        className="flex items-center gap-2 text-secondary font-normal group">
        View More{" "}
        <div className="transform group-hover:translate-x-1 transition-transform duration-300">
          <ArrowRight size={16} />
        </div>
      </Link>
    </div>
  );
}
