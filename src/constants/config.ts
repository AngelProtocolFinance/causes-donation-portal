import video from "assets/videos/holdinghands.mp4";
import donateImage from "assets/images/charitable_giving.jpeg";

export const app = {
  id: "aging",
  indexFund: 1,
  url: "https://app.angelprotocol.io",
  name: "aging portal", //<-- reflect in index.html
  description: "description", //<-- reflect in index.html
  /** hero */
  hero: { video, title: "Angel protocol redefines global impact financing" },

  /** donate section */
  donate: {
    image: donateImage,
    title: "Support an impact organization - Angel Protocol",
    description:
      "We provide impact stakeholders like non-profits and social entrepreneurs with the tools to raise, coordinate, and invest capital. With Angel Protocol, impact is amplified. Funding goes further, connections run deeper, and access is available to all.",
  },

  share: {
    message: "I just donated to aging portal",
    twitterTags: ["aging"],
  },
};
