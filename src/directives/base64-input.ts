import { DirectiveBinding } from "vue";

interface Base64InputElement extends HTMLInputElement {
  _base64Handler?: (event: Event) => void;
}

interface FileReaderResult {
  target: {
    result: string | ArrayBuffer | null;
  };
}

export const vBase64Input = {
  mounted(el: Base64InputElement, binding: DirectiveBinding) {
    const handler = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            if (typeof binding.value === "function") {
              binding.value(e.target.result);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };

    el._base64Handler = handler;
    el.addEventListener("change", handler);
  },

  unmounted(el: Base64InputElement) {
    if (el._base64Handler) {
      el.removeEventListener("change", el._base64Handler);
      delete el._base64Handler;
    }
  },
};
