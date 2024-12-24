import { mount } from "@vue/test-utils";
import AnalyticsEventCard from "@/components/devTechW7/AnalyticsEventCard.vue";
import { AnalyticsEvent } from "@/models/analytics-events.model";

describe("AnalyticsEventCard.vue", () => {
  const mockEvent: AnalyticsEvent = {
    id: 1,
    application: "Test Application",
    eventType: "click",
    eventName: "Test Event",
    quantity: 42,
    updatedAt: "2023-01-01T12:00:00Z",
  };

  it("renders the event details correctly", () => {
    const wrapper = mount(AnalyticsEventCard, {
      props: { analyticsEvent: mockEvent },
    });

    expect(wrapper.find(".event-title").text()).toBe("Test Event");
    expect(wrapper.text()).toContain("Type: click");
    expect(wrapper.find(".quantity-badge").text()).toBe("42");

    const formattedDate = new Date(mockEvent.updatedAt).toLocaleString();
    expect(wrapper.text()).toContain(`Last Updated: ${formattedDate}`);
  });

  it("formats the date correctly", () => {
    const wrapper = mount(AnalyticsEventCard, {
      props: { analyticsEvent: mockEvent },
    });

    const formattedDate = wrapper.vm.$options.methods!.formatDate.call(wrapper.vm, mockEvent.updatedAt);
    const expectedDate = new Date(mockEvent.updatedAt).toLocaleString();

    expect(formattedDate).toBe(expectedDate);
  });

  it("throws a warning if required props are missing", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    expect(() => {
      mount(AnalyticsEventCard, {
        props: { analyticsEvent: undefined as unknown as AnalyticsEvent },
      });
    }).toThrow();

    consoleWarnSpy.mockRestore();
  });

  it("renders correctly with edge case quantity", () => {
    const edgeCaseEvent = {
      ...mockEvent,
      quantity: 0,
    };

    const wrapper = mount(AnalyticsEventCard, {
      props: { analyticsEvent: edgeCaseEvent },
    });

    expect(wrapper.find(".quantity-badge").text()).toBe("0");
  });
});

