"use client";

import Cal from "@calcom/embed-react";
import { calWidget } from "./CalEmbed.styles";

interface CalEmbedProps {
  calUsername: string;
}

export default function CalEmbed({ calUsername }: CalEmbedProps) {
  return (
    <Cal
      calLink={calUsername}
      style={calWidget}
      config={{ layout: "month_view" }}
    />
  );
}
