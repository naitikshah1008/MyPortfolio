import { create } from "zustand";
import api from "../utils/api";
import { getFallbackProfile } from "../utils/profile";

let profilePromise;

const useProfileStore = create((set, get) => ({
  profile: getFallbackProfile(),
  hasLoadedProfile: false,

  setProfile: (profile) =>
    set({
      profile: { ...getFallbackProfile(), ...profile },
      hasLoadedProfile: true,
    }),

  loadProfile: async () => {
    if (get().hasLoadedProfile) {
      return get().profile;
    }

    if (!profilePromise) {
      profilePromise = api
        .get("/auth/portfolio-owner")
        .then(({ data }) => {
          const profile = { ...getFallbackProfile(), ...data };
          set({ profile, hasLoadedProfile: true });
          return profile;
        })
        .catch((error) => {
          profilePromise = null;
          throw error;
        });
    }

    return profilePromise;
  },
}));

export default useProfileStore;
