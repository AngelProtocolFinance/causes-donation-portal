import { app } from "constants/config";

export default function Hero() {
  return (
    <header className="bg-blue dark:bg-blue-d4 grid place-items-center relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute object-cover h-full w-full inset-0 opacity-50 brightness-50"
      >
        <source src={app.hero.video} type="video/mp4" />
      </video>

      <h1 className="text-3xl sm:text-4xl sm:leading-relaxed mt-40 font-extrabold uppercase text-center z-[1] text-white">
        {app.hero.title}
      </h1>
      <a
        className="z-[1] rounded-md btn-orange uppercase px-4 py-2 mb-16 mt-4 font-bold text-sm"
        href="#donate_now"
      >
        Donate Now
      </a>
    </header>
  );
}
