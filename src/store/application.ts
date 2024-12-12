import { defineStore } from "pinia";
import { Application } from "@/models/application.model";

export const useApplicationStore = defineStore("application", {
  state: () => ({
    applications: [] as Application[],
  }),
  actions: {
    setApplications(applications: Application[]) {
      this.applications = applications;
    },
    getApplicationByName(name: string): Application | undefined {
      return this.applications.find((app) => app.name === name);
    },
  },
});
