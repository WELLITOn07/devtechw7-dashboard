import { mount } from "@vue/test-utils";
import CourseForm from "@/components/biomdesandra-api/CourseForm.vue";
import { fetchCourses, updateCourse, deleteCourse } from "@/services/CourseService";

jest.mock("@/services/CourseService", () => ({
  fetchCourses: jest.fn(),
  updateCourse: jest.fn(),
  deleteCourse: jest.fn(),
}));

describe("CourseForm.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    jest.clearAllMocks();
    (fetchCourses as jest.Mock).mockResolvedValue([]);
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

  it("loads courses on mount", async () => {
    const mockCourses = [
      {
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
      },
    ];

    (fetchCourses as jest.Mock).mockResolvedValueOnce(mockCourses);
    wrapper = mount(CourseForm);
    
    // Wait for the component to update
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(fetchCourses).toHaveBeenCalled();
    expect(wrapper.vm.formData).toEqual(mockCourses);
  });

  it("saves courses correctly", async () => {
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
      subjects: [],
      works: [],
    };

    wrapper = mount(CourseForm);
    wrapper.vm.formData = [mockCourse];
    
    (updateCourse as jest.Mock).mockResolvedValueOnce(mockCourse);
    await wrapper.vm.handleSaveAll();

    expect(updateCourse).toHaveBeenCalledWith(mockCourse.id, mockCourse);
    expect(fetchCourses).toHaveBeenCalled();
  });

  it("deletes course correctly", async () => {
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
      subjects: [],
      works: [],
    };

    wrapper = mount(CourseForm);
    wrapper.vm.formData = [mockCourse];
    wrapper.vm.existingCourseIds = new Set([mockCourse.id]);

    await wrapper.vm.removeCourse(mockCourse.id, 0);

    expect(deleteCourse).toHaveBeenCalledWith(mockCourse.id);
    expect(wrapper.vm.formData).toHaveLength(0);
  });

  it("formats currency correctly", () => {
    wrapper = mount(CourseForm);
    const formattedValue = wrapper.vm.formatCurrency("10000");
    expect(formattedValue.replace(/\s/g, '')).toBe("R$100,00");
    expect(wrapper.vm.formatCurrency("").replace(/\s/g, '')).toBe("R$0,00");
  });

  it("adds new course correctly", () => {
    wrapper = mount(CourseForm);
    wrapper.vm.addCourse();
    
    expect(wrapper.vm.formData).toHaveLength(1);
    expect(wrapper.vm.formData[0]).toMatchObject({
      id: "",
      title: "",
      type: "",
      description: "",
      cover: "",
      link: "",
      price: {
        original: "R$ 0,00",
        discounted: "R$ 0,00",
      },
      subjects: [],
      works: [],
    });
  });
});
