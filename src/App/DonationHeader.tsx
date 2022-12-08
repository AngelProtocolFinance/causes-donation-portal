import { app } from "constants/config";

export default function DonationHeader() {
  return (
    <section className="sm:container-unpadded container-padded my-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        {app.donate.title}
      </h2>
      <p className="leading-relaxed">{app.donate.description}</p>
    </section>
  );
}
