<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  location: {
    type: String as PropType<"top" | "bottom" | "left" | "right">,
    default: "bottom",
  },
  align: {
    type: String as PropType<"start" | "center" | "end">,
    default: "center",
  },
  maxWidth: {
    type: [Number, String],
    default: 320,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 200,
  },
});

const maxWidthStyle = computed(() => {
  return typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth;
});
</script>

<template>
  <AppPopover
    v-if="!disabled && label"
    trigger="hover"
    :location="location"
    :align="align"
    :delay="delay"
    :show-caret="true"
    border-radius="8px"
    box-shadow="0 4px 20px rgba(0, 0, 0, 0.4)"
    border="1px solid rgba(255, 255, 255, 0.15)"
    caret-background-color="#0a0a0a"
    :location-allowance="8"
  >
    <template #trigger="{ props: triggerProps }">
      <span class="tooltip-trigger" v-bind="triggerProps">
        <slot></slot>
      </span>
    </template>

    <div class="tooltip-content" role="tooltip">
      {{ label }}
    </div>
  </AppPopover>
  
  <slot v-else></slot>
</template>

<style lang="scss" scoped>
.tooltip-trigger {
  display: inline;
  cursor: help;
  position: relative;
}

.tooltip-content {
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  max-width: v-bind(maxWidthStyle);
  width: auto;
  background-color: #0a0a0a;
  border-radius: 8px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
