"use client";

import { useEffect } from "react";

export default function SetFavicon({ iconUrl }) {
  useEffect(() => {
    if (!iconUrl) return;

    let favicon = document.querySelector("link[rel='icon']");
    
    // Nếu chưa có thì tạo mới
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.setAttribute("rel", "icon");
      document.head.appendChild(favicon);
    }

    favicon.setAttribute("href", iconUrl);
  }, [iconUrl]);

  return null;
}
