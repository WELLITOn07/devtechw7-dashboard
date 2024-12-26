import { useApplicationStore } from "@/stores/application";
import { setActivePinia, createPinia } from "pinia";

describe("ApplicationStore", () => {
  let store: ReturnType<typeof useApplicationStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useApplicationStore();
  });

  it("initializes with an empty applications array", () => {
    expect(store.applications).toEqual([]);
  });

  it("sets applications correctly with setApplications", () => {
    const mockApplications = [
      {
        id: 1,
        name: "App 1",
        description: "Description 1",
        controllers: [],
        allowedRoles: [],
        createdAt: "2023-10-01T00:00:00Z",
      },
      {
        id: 2,
        name: "App 2",
        description: "Description 2",
        controllers: [],
        allowedRoles: [],
        createdAt: "2023-10-02T00:00:00Z",
      },
    ];

    store.setApplications(mockApplications);

    expect(store.applications).toEqual(mockApplications);
  });

  it("retrieves an application by name using getApplicationByName", () => {
    const mockApplications = [
      {
        id: 1,
        name: "App 1",
        description: "Description 1",
        controllers: [],
        allowedRoles: [],
        createdAt: "2023-10-01T00:00:00Z",
      },
      {
        id: 2,
        name: "App 2",
        description: "Description 2",
        controllers: [],
        allowedRoles: [],
        createdAt: "2023-10-02T00:00:00Z",
      },
    ];

    store.setApplications(mockApplications);

    const app = store.getApplicationByName("App 1");
    expect(app).toEqual(mockApplications[0]);
  });

  it("returns undefined when getApplicationByName does not find a match", () => {
    const mockApplications = [
      {
        id: 1,
        name: "App 1",
        description: "Description 1",
        controllers: [],
        allowedRoles: [],
        createdAt: "2023-10-01T00:00:00Z",
      },
    ];

    store.setApplications(mockApplications);

    const app = store.getApplicationByName("Nonexistent App");
    expect(app).toBeUndefined();
  });

  it("retrieves an application by id using getApplicationById", () => {
    const mockApplications = [
      {
        id: 1,
        name: "App 1",
        description: "Description 1",
        controllers: [],
        allowedRoles: [],
        createdAt: "2023-10-01T00:00:00Z",
      },
      {
        id: 2,
        name: "App 2",
        description: "Description 2",
        controllers: [],
        allowedRoles: [],
        createdAt: "2023-10-02T00:00:00Z",
      },
    ];

    store.setApplications(mockApplications);

    const app = store.getApplicationById(2);
    expect(app).toEqual(mockApplications[1]);
  });

  it("returns undefined when getApplicationById does not find a match", () => {
    const mockApplications = [
      {
        id: 1,
        name: "App 1",
        description: "Description 1",
        controllers: [],
        allowedRoles: [],
        createdAt: "2023-10-01T00:00:00Z",
      },
    ];

    store.setApplications(mockApplications);

    const app = store.getApplicationById(999);
    expect(app).toBeUndefined();
  });
});

