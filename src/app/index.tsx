import WalletContext from "contexts/WalletContext";
import AngelInfo from "./AngelInfo";
import DonateForm from "../components/DonateForm/DonateForm";
import DonationHeader from "./DonationHeader";
import DonationMetrics from "./DonationMetrics";
import Footer from "./Footer";
import donateImage from "assets/images/charitable_giving.jpeg";
import Hero from "./Hero";

export default function App() {
  return (
    <WalletContext>
      <Hero />
      <DonationHeader />
      <div className="grid md:grid-cols-[3fr_4fr]  container-padded gap-4 my-16">
        <img
          className="h-60 md:h-96 w-full object-cover rounded"
          src={donateImage}
        />
        <DonateForm />
      </div>
      <DonationMetrics />
      <AngelInfo />
      <Footer />
    </WalletContext>
  );
}
