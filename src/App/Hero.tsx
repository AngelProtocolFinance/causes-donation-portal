import { copyAndImages } from "constants/constants";

export default function Hero() {
  return (
    <header className="grid justify-items-center gap-4 relative container-padded h-80 border border-prim">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute object-cover h-full w-full inset-0 z-[-1] brightness-50 rounded-md rounded-t-none"
      >
        <source src={copyAndImages.hero_video} type="video/mp4" />
      </video>

      <h1 className="text-3xl sm:text-4xl sm:leading-relaxed mt-40 font-extrabold uppercase text-center">
        {copyAndImages.hero_title}
      </h1>
      <a
        className="rounded-md px-4 py-2 my-8 btn-orange uppercase font-bold"
        href="#donate_now"
      >
        Donate Now
      </a>
    </header>
  );
}
