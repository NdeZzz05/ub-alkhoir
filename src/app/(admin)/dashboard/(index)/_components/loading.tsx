import React from "react";

export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-4 py-48 justify-center items-center">
      <span className="loader"></span>
      <span>Sedang memuat data ...</span>
    </div>
  );
}
