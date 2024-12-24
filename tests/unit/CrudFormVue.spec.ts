import { mount } from "@vue/test-utils";
import CrudForm from "@/components/CrudForm.vue";
import DevTechW7View from "@/views/DevTechW7View.vue";
import BiomedSandraView from "@/views/BiomedSandraView.vue";
import {
  ControllerDevTechW7,
  ControllerBiomedsandraApi,
} from "@/enums/controller-type.enum";

jest.mock("@/services/CourseService", () => ({
  fetchCourses: jest.fn(() =>
    Promise.resolve([{ id: 1, title: "Test Course" }])
  ),
}));

describe("CrudForm.vue", () => {
  it("renders the correct child component for ControllerDevTechW7.APPLICATION", async () => {
    const wrapper = mount(CrudForm, {
      props: {
        data: {
          data: [
            {
              id: 1,
              name: "Test Application",
              controllers: [],
              allowedRoles: [],
            },
          ],
        },
        name: ControllerDevTechW7.APPLICATION,
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DevTechW7View).exists()).toBe(true);
  });

  it("renders the correct child component for ControllerBiomedsandraApi.COURSES", async () => {
    const wrapper = mount(CrudForm, {
      props: {
        data: {
          data: [
            { 
              id: 2, 
              title: "Biology 101",
              description: "Introduction to Biology",
              price: "100.00",
              subjects: [],
              works: [],
              formData: [] 
            }
          ]
        },
        name: ControllerBiomedsandraApi.COURSES,
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(BiomedSandraView).exists()).toBe(true);
  });

  it("throws an error for unrecognized controller name", () => {
    expect(() => {
      mount(CrudForm, {
        props: {
          data: { data: [{ id: 3, name: "Unknown" }] },
          name: "unknown-controller",
        },
      });
    }).toThrowError("Unrecognized controller name: unknown-controller");
  });

  it("reacts to prop changes and updates the child component", async () => {
    const wrapper = mount(CrudForm, {
      props: {
        data: {
          data: [
            {
              id: 1,
              name: "Test Application",
              controllers: [],
              allowedRoles: [],
            },
          ],
        },
        name: ControllerDevTechW7.APPLICATION,
      },
    });

    // Wait for initial component mount
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DevTechW7View).exists()).toBe(true);

    // Change props
    await wrapper.setProps({
      name: ControllerBiomedsandraApi.COURSES,
      data: {
        data: [
          { 
            id: "2",
            title: "Biology 101",
            description: "Introduction to Biology",
            type: "course",
            link: "https://example.com/biology",
            price: {
              original: "100.00",
              discounted: "80.00"
            },
            subjects: [],
            works: []
          }
        ],
      },
    });

    // Wait for component to update
    await wrapper.vm.$nextTick();
    // Add another tick to ensure all updates are processed
    await wrapper.vm.$nextTick();
    
    expect(wrapper.findComponent(BiomedSandraView).exists()).toBe(true);
  });
});
