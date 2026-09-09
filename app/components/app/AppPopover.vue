<script lang="ts" setup>
const props = defineProps({
  trigger: {
    type: String as PropType<"click" | "hover">,
    default: "hover",
  },
  location: {
    type: String as PropType<"top" | "bottom" | "left" | "right">,
    default: "top",
  },
  align: {
    type: String as PropType<"start" | "center" | "end">,
    default: "center",
  },
  locationAllowance: {
    type: Number,
    default: 0,
  },
  alignAllowance: {
    type: Number,
    default: 0,
  },
  borderRadius: {
    type: String,
    default: "8px",
  },
  boxShadow: {
    type: String,
    default: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },
  border: {
    type: String,
    default: "1px solid rgba(255, 255, 255, 0.1)",
  },
  closeOnClick: {
    type: Boolean,
    default: true,
  },
  showCaret: {
    type: Boolean,
    default: true,
  },
  caretBackgroundColor: {
    type: String,
    default: "#0a0a0a",
  },
  caretMinEdgeDistance: {
    type: Number,
    default: 20,
  },
  delay: {
    type: Number,
    default: 200,
  },
});

const popoverWrapper = ref<HTMLElement | null>(null);
const popoverBody = ref<HTMLElement | null>(null);
const popoverPosition = ref<{
  top: number;
  left: number;
  right: number;
  width: number;
  height: number;
  x: number;
  y: number;
} | null>(null);

const isPopoverVisible = ref(false);
const caretPosition = ref({ left: "50%", top: "50%" });
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const caretBorderColor = computed(() => {
  if (!props.border) return "transparent";
  const parts = props.border.split(" ");
  return parts.length >= 3 ? parts.slice(2).join(" ") : "transparent";
});

const showPopOver = async (state: boolean) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  if (state && props.delay > 0) {
    timeoutId = setTimeout(() => {
      isPopoverVisible.value = true;
    }, props.delay);
  } else {
    isPopoverVisible.value = state;
  }
};

const triggerDimensions = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const { top, left, width, height, right } = target.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height;

  popoverPosition.value = { top, left, right, width, height, x, y };
  return { top, left, right, width, height, x, y };
};

const handleOnClick = async (event: MouseEvent) => {
  event.stopPropagation();
  triggerDimensions(event);

  if (props.trigger === "click") {
    await showPopOver(!isPopoverVisible.value);
  }
};

const handleMouseEvents = async (event: MouseEvent) => {
  event.stopPropagation();
  triggerDimensions(event);

  if (event.type === "mouseenter" && props.trigger === "hover") {
    await showPopOver(true);
  } else if (event.type === "mouseleave" && props.trigger === "hover") {
    await showPopOver(false);
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    showPopOver(false);
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

const positionStyle = computed(() => {
  if (!popoverWrapper.value || !popoverBody.value || !popoverPosition.value)
    return {};

  const bodyWidth = popoverBody.value.getBoundingClientRect().width;
  const bodyHeight = popoverBody.value.getBoundingClientRect().height;

  const screenBounds = {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    width: window.innerWidth,
  };

  let pos = {
    top: undefined,
    left: undefined,
  } as {
    top: number | undefined;
    left: number | undefined;
  };

  const caretSize = props.showCaret ? 6 : 0;

  if (props.location === "bottom") {
    pos.top = Math.min(
      popoverPosition.value.y + props.locationAllowance + caretSize,
      screenBounds.bottom - bodyHeight + props.locationAllowance - 5,
    );
  }

  if (props.location === "top") {
    pos.top = Math.max(
      popoverPosition.value.top - bodyHeight - props.locationAllowance - caretSize,
      screenBounds.top + props.locationAllowance + 5,
    );
  }

  if (props.location === "left") {
    pos.left = Math.max(
      popoverPosition.value.left - bodyWidth - props.locationAllowance - caretSize,
      screenBounds.left + props.locationAllowance + 5,
    );
  }

  if (props.location === "right") {
    pos.left = Math.min(
      popoverPosition.value.right + props.locationAllowance + caretSize,
      screenBounds.right - bodyWidth - props.locationAllowance - 5,
    );
  }

  // Handle horizontal alignment for top/bottom locations
  if (props.location === "top" || props.location === "bottom") {
    if (props.align === "start") {
      pos.left = Math.max(
        screenBounds.left + 5,
        Math.min(popoverPosition.value.left + props.alignAllowance, screenBounds.right - bodyWidth - 5),
      );
    } else if (props.align === "center") {
      const centerPos = popoverPosition.value.left + popoverPosition.value.width / 2 - bodyWidth / 2;
      pos.left = Math.max(
        screenBounds.left + 5,
        Math.min(centerPos, screenBounds.right - bodyWidth - 5),
      );
    } else if (props.align === "end") {
      pos.left = Math.max(
        screenBounds.left + 5,
        Math.min(popoverPosition.value.right - bodyWidth - props.alignAllowance, screenBounds.right - bodyWidth - 5),
      );
    }
  }

  // Handle vertical alignment for left/right locations
  if (props.location === "left" || props.location === "right") {
    if (props.align === "start") {
      pos.top = Math.max(
        screenBounds.top + 5,
        Math.min(popoverPosition.value.top + props.alignAllowance, screenBounds.bottom - bodyHeight - 5),
      );
    } else if (props.align === "center") {
      const centerPos = popoverPosition.value.top + popoverPosition.value.height / 2 - bodyHeight / 2;
      pos.top = Math.max(
        screenBounds.top + 5,
        Math.min(centerPos, screenBounds.bottom - bodyHeight - 5),
      );
    } else if (props.align === "end") {
      pos.top = Math.max(
        screenBounds.top + 5,
        Math.min(popoverPosition.value.top + popoverPosition.value.height - bodyHeight - props.alignAllowance, screenBounds.bottom - bodyHeight - 5),
      );
    }
  }

  // Calculate caret position
  if (props.showCaret && pos.left !== undefined && pos.top !== undefined) {
    const triggerCenterX = popoverPosition.value.left + popoverPosition.value.width / 2;
    const triggerCenterY = popoverPosition.value.top + popoverPosition.value.height / 2;

    if (props.location === "top" || props.location === "bottom") {
      const caretLeft = triggerCenterX - pos.left;
      caretPosition.value.left = `${Math.max(
        props.caretMinEdgeDistance,
        Math.min(caretLeft, bodyWidth - props.caretMinEdgeDistance),
      )}px`;
    }

    if (props.location === "left" || props.location === "right") {
      const caretTop = triggerCenterY - pos.top;
      caretPosition.value.top = `${Math.max(
        props.caretMinEdgeDistance,
        Math.min(caretTop, bodyHeight - props.caretMinEdgeDistance),
      )}px`;
    }
  }

  return {
    top: pos.top !== undefined ? `${pos.top}px` : undefined,
    left: pos.left !== undefined ? `${pos.left}px` : undefined,
  };
});

const togglePopover = (state?: boolean) => {
  showPopOver(state !== undefined ? state : !isPopoverVisible.value);
};

defineExpose({
  togglePopover,
});
</script>

<template>
  <div class="app-popover" ref="popoverWrapper">
    <slot
      name="trigger"
      :props="{
        onClick: handleOnClick,
        onMouseenter: handleMouseEvents,
        onMouseleave: handleMouseEvents,
      }"
      :isOpen="isPopoverVisible"
      :togglePopover="togglePopover"
    ></slot>

    <Teleport to="body">
      <transition name="fade" mode="out-in" appear>
        <div
          v-if="isPopoverVisible"
          ref="popoverBody"
          class="app-popover__content"
          :style="positionStyle"
          :data-location="location"
          @mouseenter="() => props.trigger === 'hover' && showPopOver(true)"
          @mouseleave="() => props.trigger === 'hover' && showPopOver(false)"
        >
          <div
            v-if="showCaret"
            class="app-popover__caret"
            :data-location="location"
            :style="{
              left: location === 'top' || location === 'bottom' ? caretPosition.left : undefined,
              top: location === 'left' || location === 'right' ? caretPosition.top : undefined,
              '--caret-bg-color': caretBackgroundColor,
              '--caret-border-color': caretBorderColor,
            }"
          ></div>
          <slot :isOpen="isPopoverVisible" :togglePopover="togglePopover"></slot>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.app-popover {
  display: inline-block;

  &__content {
    z-index: 9999;
    text-align: left;
    position: fixed;
    max-height: 100vh;
    max-width: min(90vw, 400px);
    overflow: visible;
    border-radius: v-bind(borderRadius);
    box-shadow: v-bind(boxShadow);
    border: v-bind(border);
    background-color: v-bind(caretBackgroundColor);
  }

  &__caret {
    position: absolute;
    z-index: 1;

    &[data-location="top"] {
      bottom: -6px;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 6px solid var(--caret-border-color);

      &::before {
        content: "";
        position: absolute;
        bottom: 1px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 5px solid var(--caret-bg-color);
      }
    }

    &[data-location="bottom"] {
      top: -6px;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 6px solid var(--caret-border-color);

      &::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 5px solid var(--caret-bg-color);
      }
    }

    &[data-location="left"] {
      right: -6px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 6px solid var(--caret-border-color);

      &::before {
        content: "";
        position: absolute;
        right: 1px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: 5px solid var(--caret-bg-color);
      }
    }

    &[data-location="right"] {
      left: -6px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 6px solid var(--caret-border-color);

      &::before {
        content: "";
        position: absolute;
        left: 1px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-right: 5px solid var(--caret-bg-color);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
