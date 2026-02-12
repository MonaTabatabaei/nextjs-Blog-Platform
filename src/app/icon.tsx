import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  // Generate a PNG favicon at runtime from SVG markup
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background rounded square */}
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="8"
          fill="#0F172A"
        />

        {/* Document icon */}
        <path
          d="M11 8h7l4 4v9c0 1.105-.895 2-2 2h-9c-1.105 0-2-.895-2-2v-11c0-1.105.895-2 2-2z"
          fill="#FFFFFF"
        />
        <path
          d="M18 8v4h4"
          fill="none"
          stroke="#0F172A"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Text lines */}
        <line
          x1="13"
          y1="14"
          x2="19"
          y2="14"
          stroke="#0F172A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line
          x1="13"
          y1="17"
          x2="19"
          y2="17"
          stroke="#0F172A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <line
          x1="13"
          y1="20"
          x2="17.5"
          y2="20"
          stroke="#0F172A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Chat bubble */}
        <path
          d="M18.5 20.5c0-1.38 1.252-2.5 2.8-2.5h2.4c1.548 0 2.8 1.12 2.8 2.5s-1.252 2.5-2.8 2.5h-1.2l-1.2 1.5-.3-1.5h-0.7c-1.548 0-2.8-1.12-2.8-2.5z"
          fill="#6366F1"
        />
      </svg>
    ),
    {
      ...size,
    },
  );
}


