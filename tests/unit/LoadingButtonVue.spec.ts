import { mount } from "@vue/test-utils";
import LoadingButton from "@/components/LoadingButton.vue";

describe("LoadingButton.vue", () => {
 it("renders loading text with dots when loading is true", async () => {
   jest.useFakeTimers();

   const wrapper = mount(LoadingButton, {
     props: {
       text: "Enviar",
       loadingText: "Carregando",
       loading: true,
     },
   });

   expect(wrapper.find("button").text()).toBe("Carregando");

   jest.advanceTimersByTime(500);
   await wrapper.vm.$nextTick();
   expect(wrapper.find("button").text()).toBe("Carregando.");

   jest.advanceTimersByTime(500);
   await wrapper.vm.$nextTick();
   expect(wrapper.find("button").text()).toBe("Carregando..");

   jest.advanceTimersByTime(500);
   await wrapper.vm.$nextTick();
     expect(wrapper.find("button").text()).toBe("Carregando...");
     
   jest.advanceTimersByTime(500);
   await wrapper.vm.$nextTick();
   expect(wrapper.find("button").text()).toBe("Carregando");
 });

  it("stops rendering dots when loading is set to false", async () => {
    jest.useFakeTimers();

    const wrapper = mount(LoadingButton, {
      props: {
        text: "Enviar",
        loadingText: "Carregando",
        loading: true,
      },
    });

    jest.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.find("button").text()).toBe("Carregando..");

    await wrapper.setProps({ loading: false });
    jest.advanceTimersByTime(500);
    await wrapper.vm.$nextTick();
    expect(wrapper.find("button").text()).toBe("Enviar");
  });

  it("disables the button when loading is true", () => {
    const wrapper = mount(LoadingButton, {
      props: {
        text: "Enviar",
        loading: true,
      },
    });

    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });

  it("emits a click event when clicked and not loading", async () => {
    const wrapper = mount(LoadingButton, {
      props: {
        text: "Enviar",
        loading: false,
      },
    });

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("does not emit a click event when clicked and loading is true", async () => {
    const wrapper = mount(LoadingButton, {
      props: {
        text: "Enviar",
        loading: true,
      },
    });

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toBeFalsy();
  });
});
