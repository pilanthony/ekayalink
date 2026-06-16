export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold mb-4">
        eKayaLink
      </h1>

      <p className="text-xl max-w-2xl">
        Connecting Overseas Filipino Workers (OFWs)
        with their loved ones through fast,
        affordable, and secure digital remittances
        powered by Stellar.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 rounded-lg border">
          Get Started
        </button>

        <button className="px-6 py-3 rounded-lg border">
          Learn More
        </button>
      </div>
    </main>
  );
}