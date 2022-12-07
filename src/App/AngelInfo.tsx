import React, { PropsWithChildren } from "react";

const AngelInfo = () => {
  return (
    <section className="container-padded">
      <article className="max-w-4xl">
        <h3 className="font-extrabold text-4xl uppercase mb-4 mt-6">
          Who we are
        </h3>
        <p className="leading-relaxed">
          Our hearts go out to everyone impacted by the collapse of $UST. The
          ripple effects of this type of loss are significant, personally and
          professionally, and we stand with everyone in recognizing that pain.
          Angel Protocol flourished due to the genuine kindness and passion of
          the crypto community. The significant contributions, amplification,
          and support raised over $6 million dollars in donations to more than:{" "}
        </p>
        <ul className="list-disc my-4 pl-4 md:pl-8">
          <li className="mb-1">
            <Anc href="https://www.angelprotocol.io/app/leaderboard">
              160 charities{" "}
            </Anc>
            with $1.5M raised to fight{" "}
            <Anc href="https://restore-earth.angelprotocol.io/">
              climate change
            </Anc>
          </li>
          <li className="mb-1">
            $500k in humanitarian relief for those impacted by{" "}
            <Anc href="https://www.youtube.com/watch?v=h3wLfQLb8_4">
              Typhoon Rai
            </Anc>
          </li>
          <li className="mb-1">
            over $200k to support{" "}
            <Anc href="https://ukraine.angelprotocol.io/">
              Ukrainian refugees.
            </Anc>
          </li>
        </ul>
        <p className="leading-relaxed mb-1 font-medium">
          It is deeply saddening that these $UST denominated funds were also
          slashed during the de-peg event.
        </p>
        <p className="leading-relaxed">
          Unfortunately, charity funds indexed for a post de-peg $LUNA airdrop
          were never received. This would have provided $1.4M ( 74,936 LUNA at
          opening price of $18.80 ) earmarked for endowment reimbursement. TFL
          is currently reviewing issues with the indexing, but there is no quick
          resolution expected.
        </p>
        <p className="leading-relaxed mt-8 mb-1 font-medium">
          We understand most people cannot be made whole from the $UST collapse,
          and we do not seek any special treatment for Angel Protocol itself.
        </p>
        <p className="leading-relaxed">
          However, the NGOs on our platform are all registered charitable
          organizations with public endowment balances that can easily be
          checked on-chain. They were not seeking risk and the sums raised
          already potentially assured the future of many of these charities.
        </p>
        <p className="mt-8 mb-1 font-medium">
          Charities exist as a safety net for causes that fall through the
          cracks of society. Please do not let the charities themselves fall
          through the cracks as well.
        </p>
        <p className="leading-relaxed">
          Funds donated here will be apportioned to each charity in line with
          the totals received prior to the $UST collapse. 100% of every donation
          will be sent to the charities. In the very near future, we shall be
          relaunching the charity marketplace, and then you will also be able to
          donate to charities individually.
        </p>
        <p className="my-8 text-lg text-blue dark:text-blue-l2 font-semibold">
          Thank you for your time, and for any support you can provide for the
          charities.
        </p>
      </article>
      <article className="max-w-4xl mb-8">
        <h3 className="font-extrabold text-4xl uppercase mb-3 mt-6">
          Our Mission
        </h3>
        <p className="leading-relaxed">
          Angel Protocol’s mission is to democratize access to endowments so any
          organization or inidual can achieve a more secure financial future. We
          generate social impact by leveraging decentralized finance to align a
          global community around shared incentives; win and help win.
        </p>
      </article>
    </section>
  );
};

export default AngelInfo;

function Anc({
  children,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "rel" | "target">) {
  return (
    <a
      {...props}
      className="text-blue dark:text-orange-l1 hover:text-orange hover:dark:text-orange-l2"
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
}
