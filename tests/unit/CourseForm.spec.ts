import { mount } from "@vue/test-utils";
import CourseForm from "@/components/biomdesandra-api/CourseForm.vue";
import { fetchCourses, updateCourse, deleteCourse } from "@/services/CourseService";
import LoadingDialog from "@/components/LoadingDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";

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
    wrapper = mount(CourseForm, {
      global: {
        components: {
          LoadingDialog,
          AlertDialog,
          ConfirmationDialog,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".course-form").exists()).toBe(true);
  });

  it("displays 'No Courses Found' when formData is empty", async () => {
    wrapper = mount(CourseForm, {
      global: {
        components: {
          LoadingDialog,
          AlertDialog,
          ConfirmationDialog,
        },
      },
    });
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
        subjects: [],
        works: [],
      },
    ];

    (fetchCourses as jest.Mock).mockResolvedValueOnce(mockCourses);
    wrapper = mount(CourseForm, {
      global: {
        components: {
          LoadingDialog,
          AlertDialog,
          ConfirmationDialog,
        },
      },
    });
    
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
      subjects: [
        {
          category: "Test Category",
          topics: ["Test Topic"],
        },
      ],
      works: [
        {
          title: "Test Work",
          url: "test_url",
        },
      ],
    };

    wrapper = mount(CourseForm, {
      global: {
        components: {
          LoadingDialog,
          AlertDialog,
          ConfirmationDialog,
        },
      },
    });

    // Setup initial state
    wrapper.vm.formData = [mockCourse];
    wrapper.vm.existingCourseIds = new Set([mockCourse.id]);
    
    // Mock service calls
    (updateCourse as jest.Mock).mockImplementationOnce((id, course) => Promise.resolve(course));
    (fetchCourses as jest.Mock).mockResolvedValueOnce([mockCourse]);
    
    // Trigger save
    await wrapper.vm.handleSaveAll();
    await wrapper.vm.$nextTick();
    
    // Confirm save
    await wrapper.vm.saveConfirmed();
    await wrapper.vm.$nextTick();
    
    // Wait for all promises to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(updateCourse).toHaveBeenCalledWith(mockCourse.id, mockCourse);
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

    wrapper = mount(CourseForm, {
      global: {
        components: {
          LoadingDialog,
          AlertDialog,
          ConfirmationDialog,
        },
      },
    });
    wrapper.vm.formData = [mockCourse];
    wrapper.vm.existingCourseIds = new Set([mockCourse.id]);

    // Simulate clicking delete and confirming
    await wrapper.vm.removeCourse(mockCourse.id, 0);
    await wrapper.vm.deleteConfirmed();

    expect(deleteCourse).toHaveBeenCalledWith(mockCourse.id);
    expect(wrapper.vm.formData).toHaveLength(0);
  });

  it("formats currency correctly", () => {
    wrapper = mount(CourseForm, {
      global: {
        components: {
          LoadingDialog,
          AlertDialog,
          ConfirmationDialog,
        },
      },
    });

    const mockEvent = (value: string) => ({
      target: { value } as HTMLInputElement,
    });

    const price = { original: "", discounted: "" };
    
    // Test with valid input
    wrapper.vm.formatCurrency(mockEvent("10000"), price, "original");
    expect(price.original).toBe("R$ 100,00");

    // Test with empty input
    wrapper.vm.formatCurrency(mockEvent(""), price, "original");
    expect(price.original).toBe("");
  });

  it("adds new course correctly", () => {
    wrapper = mount(CourseForm, {
      global: {
        components: {
          LoadingDialog,
          AlertDialog,
          ConfirmationDialog,
        },
      },
    });
    wrapper.vm.addCourse();
    
    const expectedCourse = {
      id: "",
      title: "",
      type: "",
      description: "",
      cover: "",
      link: "",
      price: {
        original: "",
        discounted: "",
      },
      subjects: [],
      works: [],
    };
    
    expect(wrapper.vm.formData).toHaveLength(1);
    expect(wrapper.vm.formData[0]).toMatchObject(expectedCourse);
  });
});
