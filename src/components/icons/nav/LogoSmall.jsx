const LogoSmall = (props) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    height={36}
    width={36}
    style={{ display: "block" }}
  >
    {/* "T" - Bold */}
    <text
      x="2"
      y="28"
      fontFamily='"Space Grotesk", sans-serif'
      fontSize={26}
      fontWeight={800}
      fill="#e5e7eb"
    >
      T
    </text>

    {/* Slash Accent */}
    <path d="M18 10 L12 32 L15 32 L21 10 Z" fill="#25d1da" />

    {/* "F" - Light */}
    <text
      x="22"
      y="28"
      fontFamily='"Space Grotesk", sans-serif'
      fontSize={26}
      fontWeight={300}
      fill="#9ca3af"
    >
      F
    </text>
  </svg>
);

export default LogoSmall;
