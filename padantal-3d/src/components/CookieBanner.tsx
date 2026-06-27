"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/lang";

const KEY = "padantal-cookies";

export function CookieBanner() {
  const { cookies } = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const decide = (value: "accept" | "reject") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[120] p-4 md:p-6">
      <div className="card mx-auto flex max-w-[1100px] flex-col gap-4 rounded-2xl bg-base/95 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-6">
        <p className="max-w-[64ch] text-[0.92rem] text-muted">
          {cookies.text}{" "}
          <a href="/legal" className="text-acc underline-offset-4 hover:underline">{cookies.more}</a>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button type="button" onClick={() => decide("reject")} className="btn btn-ghost !py-2.5 text-[0.9rem]">
            {cookies.reject}
          </button>
          <button type="button" onClick={() => decide("accept")} className="btn btn-primary !py-2.5 text-[0.9rem]">
            {cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
