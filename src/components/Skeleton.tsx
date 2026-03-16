export default function Skeleton({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
}: {
  width?: string;
  height?: string;
  borderRadius?: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background:
          "linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
}
