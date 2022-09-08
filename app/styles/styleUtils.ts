export function getTagBackground(tag: string): string {
  switch (tag) {
    case "Rookie":
      return "var(--rookie)";
    case "Deepsleeper":
      return "var(--deep-sleeper)";
    case "Sleeper":
      return "var(--sleeper)";
    case "Bust":
      return "var(--bust)";
    case "Bargain":
      return "var(--bargain)";
    case "Breakout":
      return "var(--breakout)";
    case "IR":
      return "var(--ir)";
    case "Suspension":
      return "var(--suspension)";
    default:
      return "transparent";
  }
}

export function getRoleBackground(role: string): string {
  switch (role) {
    case "RB":
      return "var(--rookie)";
    case "WR":
      return "var(--deep-sleeper)";
    case "TE":
      return "var(--sleeper)";
    case "QB":
      return "var(--bust)";
    case "DST":
      return "var(--bargain)";
    default:
      return "transparent";
  }
}
