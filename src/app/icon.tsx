import Logo from "@/components/icons/Logo";
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 46,
  height: 38,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    <Logo />,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
