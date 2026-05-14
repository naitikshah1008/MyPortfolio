import api from "./api";

const fallbackProfile = {
  name: "Naitik Shah",
  title: "Full Stack Developer",
  bio: "Full Stack Developer passionate about creating beautiful and functional web applications.",
  email: "",
  github: "",
  linkedin: "",
  hackerrank: "",
  resume: null,
  profileImage: null,
  codingProfiles: {},
  roles: [
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "MERN Stack Developer",
  ],
};

let ownerProfilePromise;

export const getFallbackProfile = () => fallbackProfile;

export const getPortfolioOwner = () => {
  if (!ownerProfilePromise) {
    ownerProfilePromise = api
      .get("/auth/portfolio-owner")
      .then(({ data }) => data)
      .catch((error) => {
        ownerProfilePromise = null;
        throw error;
      });
  }

  return ownerProfilePromise;
};
