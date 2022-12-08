import AngelInfo from "./AngelInfo";
import DonateForm from "../components/DonateForm";
import DonationHeader from "./DonationHeader";
import DonationMetrics from "./DonationMetrics";
import Footer from "./Footer";
import Header from "./Header";
import { copyAndImages } from "constants/constants";
import Hero from "./Hero";
import WalletCtx from "contexts/WalletContext/WalletCtx";
import ModalContext from "contexts/ModalContext";
import Donater from "./Donater";

export default function App() {
  return (
    <WalletCtx>
      <ModalContext>
        <div className="grid min-h-screen bg-gray-l5 dark:bg-blue-d5">
          <Header classes="-mb-[5.439rem] z-10 sticky top-0" />
          <Hero />
          <DonationHeader />
          <div className="grid lg:grid-cols-[3fr_4fr]  container-padded gap-4 my-16">
            <img
              className="h-60 lg:h-full w-full object-cover rounded"
              src={copyAndImages.donation_image}
            />
            <Donater />
          </div>
          <DonationMetrics />
          <AngelInfo />
          <Footer />
        </div>
      </ModalContext>
    </WalletCtx>
  );
}
