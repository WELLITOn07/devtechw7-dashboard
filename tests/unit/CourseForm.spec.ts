import { mount } from "@vue/test-utils";
import CourseForm from "@/components/biomdesandra-api/CourseForm.vue";
import * as CourseService from "@/services/CourseService";

jest.mock("@/services/CourseService", () => ({
  fetchCourses: jest.fn(() => Promise.resolve([])),
  createCourse: jest.fn(() => Promise.resolve({})),
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
    wrapper = mount(CourseForm, {
      props: {
        formData: [],
        "onUpdate:formData": (e: any) => wrapper.setProps({ formData: e })
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".course-form").exists()).toBe(true);
  });

  it("displays 'No Courses Found' when formData is empty", () => {
    wrapper = mount(CourseForm, {
      props: {
        formData: [],
        "onUpdate:formData": (e: any) => wrapper.setProps({ formData: e })
      }
    });
    expect(wrapper.text()).toContain("No Courses Found");
  });

  it("adds a new course when 'Add New Course' button is clicked", async () => {
    wrapper = mount(CourseForm, {
      props: {
        formData: [],
        "onUpdate:formData": (e: any) => wrapper.setProps({ formData: e })
      }
    });

    const addButton = wrapper.find(".form__button");
    await addButton.trigger("click");
    await wrapper.vm.$nextTick();
    
    const emitted = wrapper.emitted();
    expect(emitted["update:formData"]).toBeTruthy();
    expect(emitted["update:formData"][0][0]).toEqual([{
      id: "",
      title: "",
      description: "",
      cover: "",
      link: "",
      type: "",
      price: { original: "", discounted: "" },
      subjects: [],
      works: [],
    }]);
  });

  it("loads courses on mount", async () => {
    const mockCourses = [
      { 
        id: "course1", 
        title: "Test Course 1", 
        subjects: [{ category: "Math", topics: ["Algebra", "Calculus"] }], 
        works: [],
        price: { original: "", discounted: "" },
        type: "",
        description: "",
        cover: "",
        link: ""
      }
    ];

    const expectedFormattedCourses = mockCourses.map(course => ({
      ...course,
      subjects: course.subjects.map(subject => ({
        ...subject,
        topicsString: subject.topics.join(", "),
      })),
    }));
    
    (CourseService.fetchCourses as jest.Mock).mockResolvedValueOnce(mockCourses);
    
    wrapper = mount(CourseForm, {
      props: {
        formData: [],
        "onUpdate:formData": (e: any) => wrapper.setProps({ formData: e })
      }
    });

    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(CourseService.fetchCourses).toHaveBeenCalled();
    expect(wrapper.props("formData")).toEqual(expectedFormattedCourses);
  });

  it("handles course deletion", async () => {
    const mockCourse = { 
      id: "course1", 
      title: "Test Course",
      subjects: [],
      works: [],
      price: { original: "", discounted: "" },
      type: "",
      description: "",
      cover: "",
      link: ""
    };

    // Mock the delete course service
    (CourseService.deleteCourse as jest.Mock).mockResolvedValueOnce({});

    let currentFormData = [mockCourse];
    wrapper = mount(CourseForm, {
      props: {
        formData: currentFormData,
        "onUpdate:formData": (e: any) => {
          currentFormData = e;
          wrapper.setProps({ formData: e });
        }
      }
    });

    // Add the course ID to existingCourseIds
    wrapper.vm.existingCourseIds.add("course1");

    // Call removeCourse
    await wrapper.vm.removeCourse("course1", 0);
    await wrapper.vm.$nextTick();
    
    expect(CourseService.deleteCourse).toHaveBeenCalledWith("course1");
    expect(currentFormData).toHaveLength(0);
  });

  it("adds a subject to a course", async () => {
    const mockCourse = {
      id: "course1",
      title: "Test Course",
      subjects: [],
      works: [],
      price: { original: "", discounted: "" },
      type: "",
      description: "",
      cover: "",
      link: ""
    };

    wrapper = mount(CourseForm, {
      props: {
        formData: [mockCourse],
        "onUpdate:formData": (e: any) => wrapper.setProps({ formData: e })
      }
    });
    await wrapper.vm.$nextTick();

    await wrapper.vm.addSubject(0);
    
    expect(wrapper.props("formData")[0].subjects.length).toBe(1);
  });

  it("adds a work to a course", async () => {
    const mockCourse = {
      id: "course1",
      title: "Test Course",
      subjects: [],
      works: [],
      price: { original: "", discounted: "" },
      type: "",
      description: "",
      cover: "",
      link: ""
    };

    wrapper = mount(CourseForm, {
      props: {
        formData: [mockCourse],
        "onUpdate:formData": (e: any) => wrapper.setProps({ formData: e })
      }
    });
    await wrapper.vm.$nextTick();

    await wrapper.vm.addWork(0);
    
    expect(wrapper.props("formData")[0].works.length).toBe(1);
  });

  it("formats currency correctly", () => {
    wrapper = mount(CourseForm, {
      props: {
        formData: [],
        "onUpdate:formData": (e: any) => wrapper.setProps({ formData: e })
      }
    });
    expect(wrapper.vm.formatCurrency("1000")).toBe("1.000");
    expect(wrapper.vm.formatCurrency("1000000")).toBe("1.000.000");
    expect(wrapper.vm.formatCurrency("R$ 1000")).toBe("1.000");
    expect(wrapper.vm.formatCurrency("R$ 1.000")).toBe("1.000");
  });
});
