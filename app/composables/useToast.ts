export type ToastAnchor = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const message = ref("");
const visible = ref(false);
const anchor = ref<ToastAnchor | null>(null);
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function anchorFromEvent(event?: Event): ToastAnchor | null {
  const el = event?.currentTarget;
  if (!(el instanceof HTMLElement)) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

/** Lightweight shared toast — prefers sitting next to the trigger */
export const useToast = () => {
  const showToast = (
    text: string,
    options?: { ms?: number; event?: Event; anchor?: ToastAnchor | null },
  ) => {
    message.value = text;
    anchor.value = options?.anchor ?? anchorFromEvent(options?.event) ?? null;
    visible.value = true;
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      visible.value = false;
    }, options?.ms ?? 2400);
  };

  return {
    message,
    visible,
    anchor,
    showToast,
  };
};
