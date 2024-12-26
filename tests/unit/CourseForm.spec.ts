import { mount } from "@vue/test-utils";
import CourseForm from "@/components/biomdesandra-api/CourseForm.vue";
import * as CourseService from "@/services/CourseService";

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

  it("adds a new course when 'Add New Course' button is clicked", async () => {
    wrapper = mount(CourseForm);
    await wrapper.vm.$nextTick();
    
    await wrapper.find("button.btn-primary").trigger("click");
    expect(wrapper.vm.formData.length).toBe(1);
    expect(wrapper.vm.formData[0].id).toContain("course_");
  });

  it("saves courses correctly", async () => {
    const mockCourse = {
      id: "test_course",
      title: "Test Course",
      description: "Test Description",
      cover: "",
      link: "",
      type: "test",
      price: { original: "100", discounted: "80" },
      subjects: [],
      works: [],
    };

    wrapper = mount(CourseForm);
    await wrapper.vm.$nextTick();

    wrapper.vm.formData = [mockCourse];
    await wrapper.vm.handleSaveAll();

    expect(CourseService.updateCourse).toHaveBeenCalledWith(
      mockCourse.id,
      expect.objectContaining({
        id: mockCourse.id,
        title: mockCourse.title,
      })
    );
  });

  it("deletes a course correctly", async () => {
    const mockCourse = {
      id: "test_course",
      title: "Test Course",
      description: "Test Description",
      cover: "",
      link: "",
      type: "test",
      price: { original: "100", discounted: "80" },
      subjects: [],
      works: [],
    };

    wrapper = mount(CourseForm);
    await wrapper.vm.$nextTick();

    wrapper.vm.formData = [mockCourse];
    wrapper.vm.existingCourseIds.add(mockCourse.id);

    await wrapper.vm.removeCourse(mockCourse.id, 0);

    expect(CourseService.deleteCourse).toHaveBeenCalledWith(mockCourse.id);
    expect(wrapper.vm.formData.length).toBe(0);
  });

  it("formats currency correctly", () => {
    wrapper = mount(CourseForm);
    const result = wrapper.vm.formatCurrency("1234567");
    expect(result).toBe("1.234.567");
  });
});
