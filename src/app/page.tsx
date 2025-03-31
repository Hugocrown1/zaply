import UrlShortener from "@/components/UrlShortener";

export default function Home() {
  return (
    <section className="w-full h-screen">
      <div className="flex flex-col items-center justify-start space-y-16 w-full h-full max-w-[1250px] mx-auto">
        <div className="text-center mt-36">
          <h1 className="text-6xl font-bold">Welcome to Zaply</h1>
          <p className="text-xl font-semibold">
            Optimize your links, enhance your reach!
          </p>
        </div>
        <UrlShortener />
      </div>
    </section>
  );
}
