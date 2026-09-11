<script setup lang="ts">
const { message, visible, anchor } = useToast();

const style = computed(() => {
  if (!import.meta.client || !anchor.value) {
    return {
      left: "50%",
      bottom: "max(1.75rem, env(safe-area-inset-bottom, 0px) + 1rem)",
      top: "auto",
      transform: "translateX(-50%)",
    };
  }

  const gap = 10;
  const pad = 16;
  const a = anchor.value;
  const centerX = a.left + a.width / 2;
  const belowY = a.top + a.height + gap;
  const placeAbove = window.innerHeight - belowY < 52;
  const clampedLeft = Math.min(
    Math.max(centerX, pad + 72),
    window.innerWidth - pad - 72,
  );

  if (placeAbove) {
    return {
      left: `${clampedLeft}px`,
      top: `${a.top - gap}px`,
      bottom: "auto",
      transform: "translate(-50%, -100%)",
    };
  }

  return {
    left: `${clampedLeft}px`,
    top: `${belowY}px`,
    bottom: "auto",
    transform: "translate(-50%, 0)",
  };
});
</script>

<template>
  <Teleport to="body">
    <Transition name="app-toast">
      <div
        v-if="visible"
        class="app-toast"
        :style="style"
        role="status"
        aria-live="polite"
      >
        {{ message }}
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.app-toast {
  position: fixed;
  z-index: 100000;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(28, 28, 28, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
  pointer-events: none;
  white-space: nowrap;
  margin: 0;
}

.app-toast-enter-active,
.app-toast-leave-active {
  transition: opacity 0.2s ease;
}

.app-toast-enter-from,
.app-toast-leave-to {
  opacity: 0;
}
</style>
