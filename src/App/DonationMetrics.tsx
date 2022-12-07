import toCurrency from "helpers/toCurrency";
import { useMetricsQuery } from "services/apes";

const DonationMetrics = () => {
  const {
    data = { numberOfDonations: "0", largestDonationUsd: "0", totalUsd: "0" },
  } = useMetricsQuery("");

  return (
    <section className="font-heading grid grid-cols-1 md:grid-cols-3 gap-16 items-center p-8 my-16">
      <Metric
        name="Total Donated"
        value={toCurrency(+data.totalUsd, 3) + " USDC"}
      />
      <Metric
        name="Largest Donation"
        value={toCurrency(+data.largestDonationUsd, 3) + " USDC"}
      />
      <Metric name="Number of Donations" value={data.numberOfDonations} />
    </section>
  );
};

export default DonationMetrics;

function Metric(props: { name: string; value: string }) {
  return (
    <div className="grid gap-4 place-items-center p-8 rounded-md border bg-white dark:bg-blue-d6 border-prim">
      <p className="text-xl font-semibold">{props.name}</p>
      <p className="text-3xl font-bold">{props.value}</p>
    </div>
  );
}
