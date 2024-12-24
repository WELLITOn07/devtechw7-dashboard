import { mount } from "@vue/test-utils";
import AccessRulesForm from "@/components/devTechW7/AccessRulesForm.vue";
import { deleteAccessRule } from "@/services/AccessRuleService";
import { AccessRule } from "@/models/devtechw7.model";

jest.mock("@/services/AccessRuleService", () => ({
  deleteAccessRule: jest.fn(),
}));

describe("AccessRulesForm.vue", () => {
  const mockData = {
    data: [
      {
        id: 1,
        urlOrigin: "https://example.com",
        allowedRoles: ["Admin", "Editor"],
        createdAt: "2023-01-01T00:00:00Z",
      },
      {
        id: 2,
        urlOrigin: "https://another-example.com",
        allowedRoles: ["Viewer"],
        createdAt: "2023-01-01T00:00:00Z",
      },
    ],
  };

  it("renders the initial access rules correctly", () => {
    const wrapper = mount(AccessRulesForm, {
      props: { data: mockData },
    });

    const ruleSections = wrapper.findAll(".form__section");
    expect(ruleSections.length).toBe(2);

    const firstRuleInput = ruleSections[0].find("input[type='text']");
    expect((firstRuleInput.element as HTMLInputElement).value).toBe(
      "https://example.com"
    );

    const secondRuleInput = ruleSections[1].find("input[type='text']");
    expect((secondRuleInput.element as HTMLInputElement).value).toBe(
      "https://another-example.com"
    );
  });

  it("adds a new access rule", async () => {
    const wrapper = mount(AccessRulesForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-primary").trigger("click");
    expect(wrapper.vm.formData.length).toBe(3);

    const newRule = wrapper.vm.formData[2];
    expect(newRule.urlOrigin).toBe("");
    expect(newRule.allowedRoles).toEqual([]);
  });

  it("removes an unsaved access rule", async () => {
    const wrapper = mount(AccessRulesForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-primary").trigger("click");
    await wrapper.find(".btn-danger").trigger("click"); 

    expect(wrapper.vm.formData.length).toBe(2);
  });

  it("removes an existing access rule", async () => {
    const wrapper = mount(AccessRulesForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-danger").trigger("click"); 
    expect(deleteAccessRule).toHaveBeenCalledWith(1); 
    expect(wrapper.vm.formData.length).toBe(1); 
  });

  it("emits save event with updated data", async () => {
    const wrapper = mount(AccessRulesForm, {
      props: { data: mockData },
    });

    wrapper.vm.formData[0].urlOrigin = "https://updated-example.com";
    await wrapper.find("form").trigger("submit.prevent");
  });

  it("handles API error during delete gracefully", async () => {
    (deleteAccessRule as jest.Mock).mockRejectedValue(
      new Error("Delete failed")
    );

    const wrapper = mount(AccessRulesForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-danger").trigger("click");

    expect(wrapper.vm.dialogMessage).toBe("Delete failed");
    expect(wrapper.vm.showDialog).toBe(true);
  });
});
