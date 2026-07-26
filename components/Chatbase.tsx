"use client";

import { useEffect } from "react";

export default function Chatbase() {
  useEffect(() => {
    let loaded = false;

    const loadChatbase = () => {
      if (loaded) return;

      loaded = true;

      (function () {
        if (
          !window.chatbase ||
          window.chatbase("getState") !== "initialized"
        ) {
          window.chatbase = (...args: any[]) => {
            if (!window.chatbase.q) {
              window.chatbase.q = [];
            }
            window.chatbase.q.push(args);
          };

          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
              if (prop === "q") {
                return target.q;
              }

              return (...args: unknown[]) => target(prop as any, ...args);
            },
          });
        }

        const script = document.createElement("script");

        script.src = "https://www.chatbase.co/embed.min.js";

        script.id = "5VCZcQAgpV-Iv18FxcOK4";

        document.body.appendChild(script);
      })();
    };

    const handleScroll = () => {
      if (window.scrollY > 250) {
        loadChatbase();

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}