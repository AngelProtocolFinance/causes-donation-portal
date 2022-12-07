import { copyAndImages } from "constants/constants";

export default function DonationHeader() {
  return (
    <section className="sm:container-unpadded container-padded my-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-600 mb-4">
        {copyAndImages.donation_title}
      </h2>
      <p className="text-slate-600 leading-relaxed">
        {copyAndImages.donation_subtitle}
      </p>
    </section>
  );
}
