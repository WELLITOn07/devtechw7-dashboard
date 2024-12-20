import { mount } from "@vue/test-utils";
import AlertDialog from "@/components/AlertDialog.vue";

describe("AlertDialog.vue", () => {
  it("renders the dialog when visible is true", () => {
    const wrapper = mount(AlertDialog, {
      props: {
        visible: true,
        title: "Test Title",
        message: "Test Message",
      },
    });

    expect(wrapper.find(".dialog-overlay").exists()).toBe(true);
    expect(wrapper.find(".dialog-title").text()).toBe("Test Title");
    expect(wrapper.find(".dialog-message").text()).toBe("Test Message");
  });

  it("does not render the dialog when visible is false", () => {
    const wrapper = mount(AlertDialog, {
      props: {
        visible: false,
        message: "Test Message",
      },
    });

    expect(wrapper.find(".dialog-overlay").exists()).toBe(false);
  });

  it("uses default title when no title is provided", () => {
    const wrapper = mount(AlertDialog, {
      props: {
        visible: true,
        message: "Test Message",
      },
    });

    expect(wrapper.find(".dialog-title").text()).toBe("Alert");
  });

  it("emits close event when the OK button is clicked", async () => {
    const wrapper = mount(AlertDialog, {
      props: {
        visible: true,
        title: "Test Title",
        message: "Test Message",
      },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close.length).toBe(1);
  });

  it("applies correct styles and classes", () => {
    const wrapper = mount(AlertDialog, {
      props: {
        visible: true,
        title: "Test Title",
        message: "Test Message",
      },
    });

    const overlay = wrapper.find(".dialog-overlay");
    const content = wrapper.find(".dialog-content");

    expect(overlay.classes()).toContain("w7-center");
    expect(content.classes()).toContain("w7-padding");
  });
});
