declare module "vue-the-mask" {
  import { DirectiveFunction, DirectiveOptions } from "vue";

  export const mask: DirectiveFunction | DirectiveOptions;
  export const tokens: { [key: string]: string | RegExp };
}
