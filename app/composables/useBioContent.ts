export interface BioSegment {
  text: string;
  type: "text" | "power-word";
  tooltip?: string;
  className?: string;
}

export const useBioContent = () => {
  const bioSegments: BioSegment[] = [
    { text: "A ", type: "text" },
    {
      text: "builder",
      type: "power-word",
      tooltip:
        "Someone who doesn't just design—builds from scratch, ships working software, and owns the full journey from concept to production.",
    },
    { text: " and ", type: "text" },
    {
      text: "solution architect",
      type: "power-word",
      tooltip:
        "Designing systems that solve real business problems while accounting for technical constraints, team capabilities, and future growth.",
    },
    { text: " specializing in ", type: "text" },
    {
      text: "software systems",
      type: "power-word",
      tooltip:
        "End-to-end software platforms: APIs, databases, distributed systems, frontend applications—the complete stack that powers products.",
    },
    { text: ". He architects solutions that work in the ", type: "text" },
    {
      text: "real world",
      type: "power-word",
      tooltip:
        "Built for actual users, actual constraints, and actual business needs—not just theoretical perfection on paper.",
    },
    { text: "—designed for real constraints, built to ", type: "text" },
    {
      text: "scale",
      type: "power-word",
      tooltip:
        "Systems designed from day one to handle growth in users, data, and complexity without breaking or requiring rewrites.",
    },
    {
      text: ", engineered to last. Proven expertise transforming complex technical challenges into elegant, ",
      type: "text",
    },
    {
      text: "intentional",
      type: "power-word",
      tooltip:
        "Every architectural decision is deliberate—no accidental complexity, no cargo-cult patterns, just purposeful design that serves the goal.",
    },
    { text: " outcomes across multiple domains.", type: "text" },
  ];

  return {
    bioSegments,
  };
};
