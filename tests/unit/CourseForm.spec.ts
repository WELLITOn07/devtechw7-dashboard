import { mount } from "@vue/test-utils";
import CourseForm from "@/components/biomdesandra-api/CourseForm.vue";

jest.mock("@/services/CourseService", () => ({
  fetchCourses: jest.fn(() => Promise.resolve([])),
  updateCourse: jest.fn(() => Promise.resolve({})),
  deleteCourse: jest.fn(() => Promise.resolve({})),
}));

describe("CourseForm.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("renders correctly", () => {
    wrapper = mount(CourseForm);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".course-form").exists()).toBe(true);
  });

  it("displays 'No Courses Found' when formData is empty", async () => {
    wrapper = mount(CourseForm);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("No Courses Found");
  });

  const mockCourse = {
    id: "test_course",
    title: "Test Course",
    type: "test",
    description: "Test Description",
    cover: "test_cover",
    link: "test_link",
    price: {
      original: "R$ 100,00",
      discounted: "R$ 80,00",
    },
    subjects: [
      {
        category: "Test Category",
        topics: ["Test Topic"],
        topicsString: "Test Topic",
      },
    ],
    works: [
      {
        title: "Test Work",
        url: "test_url",
      },
    ],
  };

  beforeEach(() => {
    // Mock fetch
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockCourse]),
      })
    ) as jest.Mock;

    wrapper = mount(CourseForm);
  });

  it("adds a new course when 'Add New Course' button is clicked", async () => {
    wrapper.vm.formData = [];
    await wrapper.find("button.btn-primary").trigger("click");
    expect(wrapper.vm.formData.length).toBe(1);
    expect(typeof wrapper.vm.formData[0].id).toBe("string");
    expect(wrapper.vm.formData[0].id.length).toBeGreaterThan(0);
  });

  it("formats currency correctly", () => {
    const result = wrapper.vm.formatCurrency("1234567");
    expect(result).toBe("1.234.567");
  });

  it("saves courses correctly", async () => {
    wrapper.vm.formData = [mockCourse];

    await wrapper.vm.handleSaveAll();

    expect(window.fetch).toHaveBeenCalledWith(
      "https://biomedsandra-api.vercel.app/api/courses",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([mockCourse]),
      })
    );
  });

  it("deletes a course correctly", async () => {
    wrapper.vm.formData = [mockCourse];
    wrapper.vm.existingCourseIds = new Set([mockCourse.id]);

    await wrapper.vm.removeCourse(mockCourse.id, 0);

    expect(window.fetch).toHaveBeenCalledWith(
      `https://biomedsandra-api.vercel.app/api/courses/${mockCourse.id}`,
      expect.objectContaining({
        method: "DELETE",
      })
    );
    expect(wrapper.vm.formData.length).toBe(0);
  });
});
