import { DirectiveBinding } from "vue";

export default {
  mounted(
    el: HTMLInputElement | HTMLTextAreaElement,
    binding: DirectiveBinding
  ) {
    const handleInput = (event: Event) => {
      const input = event.target as HTMLInputElement | HTMLTextAreaElement;
      const base64Pattern = /^data:image\/[a-zA-Z]+;base64,/;

      if (base64Pattern.test(input.value)) {
        input.value = input.value.replace(base64Pattern, "");

        const inputEvent = new Event("input", { bubbles: true });
        input.dispatchEvent(inputEvent);
      }
    };

    el.addEventListener("input", handleInput);
    (el as any).__handleInput = handleInput;
  },

  unmounted(el: HTMLInputElement | HTMLTextAreaElement) {
    const handleInput = (el as any).__handleInput;
    if (handleInput) {
      el.removeEventListener("input", handleInput);
      delete (el as any).__handleInput;
    }
  },
};
