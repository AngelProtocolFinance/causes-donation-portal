import { PropsWithChildren } from "react";

export default function Skeleton({ children }: PropsWithChildren<{}>) {
  return (
    <div
      className="bg-red/10 rounded p-4 grid gap-2 content-start relative border border-prim scroll-mt-24"
      id="donate_now"
    >
      <p className="absolute inset-0 bg-white/80 dark:bg-white/40 rounded grid place-items-center text-lg font-bold font-heading">
        {children}
      </p>
      <Content className="h-8" />
      <Content className="h-10 mt-4 w-40" />
      <Content className="h-16" />
      <Content className="h-10 mt-4 w-40" />
      <Content className="h-16" />
      <Content className="h-14 mt-4" />
    </div>
  );
}

function Content({ className = "" }) {
  return <div className={className + " bg-gray dark:bg-bluegray rounded"} />;
}
