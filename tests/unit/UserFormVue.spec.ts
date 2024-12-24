import { mount } from "@vue/test-utils";
import { saveUsers, updateUser, deleteUser } from "@/services/usersService";
import { User } from "@/models/user.model";
import UserForm from "@/components/devTechW7/UserForm.vue";

jest.mock("@/services/usersService", () => ({
  saveUsers: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

describe("UsersForm.vue", () => {
  const mockData: { data: User[] } = {
    data: [
      {
        id: 1,
        email: "test1@example.com",
        name: "User One",
        password: "",
        birthAt: "2000-01-01",
        rule: ["Admin"],
        createdAt: "2023-01-01T00:00:00Z",
      },
      {
        id: 2,
        email: "test2@example.com",
        name: "User Two",
        password: "",
        birthAt: "1990-05-05",
        rule: ["Editor"],
        createdAt: "2023-01-01T00:00:00Z",
      },
    ],
  };

  it("renders the initial user data correctly", () => {
    const wrapper = mount(UserForm, {
      props: { data: mockData },
    });

    const userSections = wrapper.findAll(".form__section");
    expect(userSections.length).toBe(2);
    expect((userSections[0].find("input[type='email']").element as HTMLInputElement).value).toBe(
      "test1@example.com"
    );
    expect((userSections[1].find("input[type='email']").element as HTMLInputElement).value).toBe(
      "test2@example.com"
    );
  });

  it("adds a new user", async () => {
    const wrapper = mount(UserForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-primary").trigger("click");
    expect(wrapper.vm.formData.length).toBe(2); 
  });

  it("removes a user without an ID", async () => {
    const wrapper = mount(UserForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-primary").trigger("click"); 
    await wrapper.find(".btn-danger").trigger("click"); 
    expect(wrapper.vm.formData.length).toBe(1);
  });

  it("removes a user with an ID", async () => {
    const wrapper = mount(UserForm, {
      props: { data: mockData },
    });

    await wrapper.find(".btn-danger").trigger("click"); 
    expect(deleteUser).toHaveBeenCalledWith(1);
    expect(wrapper.vm.formData.length).toBe(1); 
  });

  it("saves new users", async () => {
    const wrapper = mount(UserForm, {
      props: { data: { data: [] } },
    });

    await wrapper.find(".btn-primary").trigger("click"); 
    await wrapper.find("form").trigger("submit.prevent"); 
    expect(saveUsers).toHaveBeenCalledTimes(1); 
  });

  it("updates an existing user", async () => {
    const wrapper = mount(UserForm, {
      props: { data: mockData },
    });

    const user = wrapper.vm.formData[0];
    user.name = "Updated User";
    await wrapper.vm.handleUpdateUser(user, 0);

    expect(updateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: "Updated User",
      })
    );
  });

  it("shows error dialog when update fails", async () => {
    (updateUser as jest.Mock).mockRejectedValue(new Error("Update failed"));

    const wrapper = mount(UserForm, {
      props: { data: mockData },
    });

    const user = wrapper.vm.formData[0];
    user.name = "Failed Update";

    await wrapper.vm.handleUpdateUser(user, 0);

    expect(wrapper.vm.dialogMessage).toBe(
      "Failed to update user. Please try again."
    );
  });
});

