/**
 * OPTION 2: Markdown-like syntax
 * Quick to edit, more readable, easier for non-developers
 */

export interface PowerWord {
  word: string;
  tooltip: string;
}

export const useBioMarkdown = () => {
  // Define your bio with [word](tooltip) syntax
  const bioMarkdown = `A [builder](Someone who doesn't just design—builds from scratch, ships working software, and owns the full journey from concept to production.) and [solution architect](Designing systems that solve real business problems while accounting for technical constraints, team capabilities, and future growth.) specializing in [software systems](End-to-end software platforms: APIs, databases, distributed systems, frontend applications—the complete stack that powers products.). He architects solutions that work in the [real world](Built for actual users, actual constraints, and actual business needs—not just theoretical perfection on paper.)—designed for real constraints, built to [scale](Systems designed from day one to handle growth in users, data, and complexity without breaking or requiring rewrites.), engineered to last. Proven expertise transforming complex technical challenges into elegant, [intentional](Every architectural decision is deliberate—no accidental complexity, no cargo-cult patterns, just purposeful design that serves the goal.) outcomes across multiple domains.`;

  // Parser that converts markdown-like syntax to segments
  const parseBio = (text: string) => {
    const segments: Array<{ text: string; type: 'text' | 'power-word'; tooltip?: string }> = [];
    
    // Regex to match [word](tooltip) pattern
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        segments.push({
          text: text.slice(lastIndex, match.index),
          type: 'text',
        });
      }

      // Add the power word
      segments.push({
        text: match[1],
        type: 'power-word',
        tooltip: match[2],
      });

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      segments.push({
        text: text.slice(lastIndex),
        type: 'text',
      });
    }

    return segments;
  };

  const bioSegments = parseBio(bioMarkdown);

  return {
    bioMarkdown,
    bioSegments,
  };
};

/**
 * Usage in component (SAME as Option 1!):
 * 
 * <script setup>
 * const { bioSegments } = useBioMarkdown();
 * </script>
 * 
 * <template>
 *   <p class="body-left__bio">
 *     <template v-for="(segment, index) in bioSegments" :key="index">
 *       <AppTooltip 
 *         v-if="segment.type === 'power-word'" 
 *         :label="segment.tooltip!"
 *       >
 *         <strong class="power-word">{{ segment.text }}</strong>
 *       </AppTooltip>
 *       <span v-else>{{ segment.text }}</span>
 *     </template>
 *   </p>
 * </template>
 * 
 * To update bio: Just edit the bioMarkdown string!
 */
