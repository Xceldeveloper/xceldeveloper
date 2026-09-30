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
        "He can think a thing through and still roll up his sleeves to make it. He brings the right people along and stays with it until it actually works.",
    },
    { text: " who sees a problem and steps in to be ", type: "text" },
    {
      text: "part of the solution",
      type: "power-word",
      tooltip:
        "The world moves forward when each person plays their part. His is to build: to take the problems he sees and turn them into things that work.",
    },
    {
      text: ". It started with one thing he wanted fixed, and fixing it showed him that technology could take an idea and turn it into a system that works for humanity, in any field. He believes in a future driven by technology and ",
      type: "text",
    },
    {
      text: "used for good",
      type: "power-word",
      tooltip:
        "Technology is a tool. What matters is what it is used for, and who it serves.",
    },
    {
      text: ", where what we imagine can be turned into solutions that matter. Given a clear problem and the will to see it through, ",
      type: "text",
    },
    {
      text: "anything can be built",
      type: "power-word",
      tooltip:
        "He does not start from what seems possible. He starts from what should exist.",
    },
    {
      text: ". He is about being remembered not for what he gained, but for what he gave, and for work that keeps doing good for those we never meet.",
      type: "text",
    },
  ];

  return {
    bioSegments,
  };
};
