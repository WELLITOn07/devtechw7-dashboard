import AdvertisementForm from "@/components/devTechW7/avertisements/AdvertisementForm.vue";
import { Advertisement } from "@/models/advertisement.model";
import { mount } from "@vue/test-utils";

describe("AdvertisementForm.vue", () => {
  const mockData: Advertisement = {
    id: 1,
    title: "Test Advertisement",
    description: "This is a test description.",
    link: "https://example.com",
    image: "base64image",
  };

  it("renders the initial advertisement data correctly", () => {
    const wrapper = mount(AdvertisementForm, {
      props: { formData: mockData },
    });

    const titleInput = wrapper.find("input#title");
    expect((titleInput.element as HTMLInputElement).value).toBe(
      "Test Advertisement"
    );

    const descriptionInput = wrapper.find("textarea#description");
    expect((descriptionInput.element as HTMLTextAreaElement).value).toBe(
      "This is a test description."
    );

    const linkInput = wrapper.find("input#link");
    expect((linkInput.element as HTMLInputElement).value).toBe(
      "https://example.com"
    );

    const imageInput = wrapper.find("textarea#image");
    expect((imageInput.element as HTMLTextAreaElement).value).toBe(
      "base64image"
    );
  });

  it("updates localFormData when props.formData changes", async () => {
    const wrapper = mount(AdvertisementForm, {
      props: { formData: mockData },
    });

    await wrapper.setProps({
      formData: {
        id: 2,
        title: "Updated Advertisement",
        description: "Updated description.",
        link: "https://updated.com",
        image: "updatedBase64Image",
      },
    });

    expect(wrapper.vm.localFormData.title).toBe("Updated Advertisement");
    expect(wrapper.vm.localFormData.description).toBe("Updated description.");
    expect(wrapper.vm.localFormData.link).toBe("https://updated.com");
    expect(wrapper.vm.localFormData.image).toBe("updatedBase64Image");
  });

  it("emits save event with correct data on submit", async () => {
    const wrapper = mount(AdvertisementForm, {
      props: { formData: mockData },
    });

    wrapper.vm.localFormData.title = "New Advertisement Title";
    wrapper.vm.localFormData.description = "New Description";

    await wrapper.find("form").trigger("submit.prevent");

    const emittedSaveEvent = wrapper.emitted("save") as unknown[][];

    const updatedAd: Advertisement = {
      id: 1,
      title: "New Advertisement Title",
      description: "New Description",
      link: "https://example.com",
      image: "base64image",
    };

    expect(emittedSaveEvent).toBeTruthy();
    expect(emittedSaveEvent[0][0]).toEqual(updatedAd);
  });

  it("emits preview event with correct data on preview button click", async () => {
    const wrapper = mount(AdvertisementForm, {
      props: { formData: mockData },
    });

    wrapper.vm.localFormData.title = "Preview Title";
    wrapper.vm.localFormData.description = "Preview Description";

    await wrapper.find(".btn-primary").trigger("click");

    const emittedPreviewEvent = wrapper.emitted("preview") as unknown[][];

    const ad: Advertisement = {
      id: 1,
      title: "Preview Title",
      description: "Preview Description",
      link: "https://example.com",
      image: "base64image",
    };

    expect(emittedPreviewEvent).toBeTruthy();
    expect(emittedPreviewEvent[0][0]).toEqual(ad);
  });

  it("validates required fields before emitting save", async () => {
    const wrapper = mount(AdvertisementForm, {
      props: { formData: { title: "", description: "", link: "", image: "" } },
    });

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("save")).toBeFalsy();
  });
});
