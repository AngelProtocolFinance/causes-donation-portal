import Nav from "components/Nav";
import heroVideo from "assets/videos/holdinghands.mp4";

export default function Hero() {
  return (
    <div className="relative container-padded bg-sky-400/30 rounded rounded-t-none">
      <Nav />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute object-cover h-full w-full inset-0 z-[-1] brightness-50 rounded rounded-t-none"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <header className="grid justify-items-center gap-4">
        <h1 className="font-sans text-slate-50 text-3xl sm:text-4xl sm:leading-relaxed my-6 font-extrabold uppercase text-center">
          Help restore charity endowment funds</h1>
        <a
          className="rounded px-4 py-2 my-8 bg-amber-500 hover:bg-amber-400 active:bg-amber-100 active:text-slate-600 uppercase font-bold text-slate-50"
          href="#donate_now"
        >
          Donate Now
        </a>
      </header>
    </div>
  );
}