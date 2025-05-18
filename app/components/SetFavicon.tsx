"use client";

import { useEffect } from "react";

export default function SetFavicon({ iconUrl }: { iconUrl: string }) {
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon && iconUrl) {
      favicon.setAttribute("href", iconUrl);
    }
  }, [iconUrl]);

  return null;
}
