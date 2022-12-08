import { string } from "yup";

export const app = {
  id: "aging",
  url: "https://app.angelprotocol.io",
  name: "aging portal", //<-- reflect in index.html
  description: "description", //<-- reflect in index.html
  /** hero */
  hero: { video: "", title: "" },

  /** donate section */
  donate: {
    image: "",
    title: "Support an impact organization - Angel Protocol",
    description:
      "We provide impact stakeholders like non-profits and social entrepreneurs with the tools to raise, coordinate, and invest capital. With Angel Protocol, impact is amplified. Funding goes further, connections run deeper, and access is available to all.",
  },

  share: {
    description: "",
    tags: [""],
  },
};
