import { mount } from "@vue/test-utils";
import ApplicationForm from "@/components/devTechW7/ApplicationForm.vue";
import { deleteApplication } from "@/services/ApplicationService";
import { Application } from "@/models/application.model";

jest.mock("@/services/ApplicationService", () => ({
  deleteApplication: jest.fn(),
}));

describe("ApplicationForm.vue", () => {
  const mockData = {
    data: [
      {
        id: 1,
        name: "App One",
        description: "Description for App One",
        controllers: ["Controller1", "Controller2"],
        allowedRoles: ["Admin", "Editor"],
        createdAt: "2023-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "App Two",
        description: "Description for App Two",
        controllers: ["Controller3"],
        allowedRoles: ["Viewer"],
        createdAt: "2023-01-01T00:00:00Z",
      },
    ],
  };

  it("renders the initial application data correctly", () => {
    const wrapper = mount(ApplicationForm, {
      props: { data: mockData },
    });

    const applicationSections = wrapper.findAll(".form__section");
    expect(applicationSections.length).toBe(2);

    const firstAppNameInput = applicationSections[0].find("input[type='text']");
    expect((firstAppNameInput.element as HTMLInputElement).value).toBe(
      "App One"
    );

    const secondAppNameInput =
      applicationSections[1].find("input[type='text']");
    expect((secondAppNameInput.element as HTMLInputElement).value).toBe(
      "App Two"
    );
  });

  it("adds a new application", async () => {
    const wrapper = mount(ApplicationForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-primary").trigger("click");
    expect(wrapper.vm.formData.length).toBe(3);

    const newApplication = wrapper.vm.formData[2];
    expect(newApplication.name).toBe("");
    expect(newApplication.controllers).toEqual([]);
    expect(newApplication.allowedRoles).toEqual([]);
  });

  it("removes an unsaved application", async () => {
    const wrapper = mount(ApplicationForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-primary").trigger("click");
    await wrapper.find(".btn-danger").trigger("click");

    expect(wrapper.vm.formData.length).toBe(2); // Unsaved application removed
  });

  it("removes an existing application", async () => {
    const wrapper = mount(ApplicationForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-danger").trigger("click");

    expect(deleteApplication).toHaveBeenCalledWith(1);
    expect(wrapper.vm.formData.length).toBe(1); // Application removed
  });

   it("emits save event with updated data", async () => {
     const wrapper = mount(ApplicationForm, {
       props: { data: mockData },
     });

     const firstApplication = wrapper.vm.formData[0];
     firstApplication.name = "Updated App";

     await wrapper.find("form").trigger("submit.prevent");

     const emittedSaveEvent = wrapper.emitted("save");
     expect(emittedSaveEvent).toBeDefined();

     const emittedData = emittedSaveEvent?.[0][0] as Application[];
     expect(emittedData?.[0].name).toBe("Updated App");
   });


  it("handles API error during delete gracefully", async () => {
    (deleteApplication as jest.Mock).mockRejectedValue(
      new Error("Delete failed")
    );

    const wrapper = mount(ApplicationForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-danger").trigger("click");

    expect(wrapper.vm.dialogMessage).toBe("Delete failed");
    expect(wrapper.vm.showDialog).toBe(true);
  });
});
