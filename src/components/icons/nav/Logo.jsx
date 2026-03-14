const Logo = (props) => (
  <svg
    viewBox="0 0 220 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    height={40}
    width={220}
    style={{ display: "block" }}
  >
    {/* "THRILLER" - Bold and crisp */}
    <text
      x="0"
      y="28"
      fontFamily='"Space Grotesk", sans-serif'
      fontSize={22}
      fontWeight={800}
      letterSpacing="0.05em"
      fill="#e5e7eb"
    >
      THRILLER
    </text>

    {/* Sleek Diagonal Slash Accent */}
    <path d="M126 10 L118 32 L121 32 L129 10 Z" fill="#25d1da" />

    {/* "FIEND" - Thinner weight for modern contrast */}
    <text
      x="136"
      y="28"
      fontFamily='"Space Grotesk", sans-serif'
      fontSize={22}
      fontWeight={300}
      letterSpacing="0.02em"
      fill="#9ca3af"
    >
      FIEND
    </text>
  </svg>
);

export default Logo;
