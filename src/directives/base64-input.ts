import { DirectiveBinding } from "vue";

export const vBase64Input = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    const handleChange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files?.length) return;

      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof binding.value === "function") {
          binding.value(reader.result);
        }
      };

      reader.readAsDataURL(file);
    };

    el.addEventListener("change", handleChange);
    // Store the handler for cleanup
    (el as any)._base64Handler = handleChange;
  },
  unmounted(el: HTMLInputElement) {
    // Remove the stored handler
    if ((el as any)._base64Handler) {
      el.removeEventListener("change", (el as any)._base64Handler);
      delete (el as any)._base64Handler;
    }
  },
};
