import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">

      {/* HERO SECTION */}

      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">

        <Image
          src="/eKayaLinkLogo.png"
          alt="eKayaLink Logo"
          width={350}
          height={120}
          className="mx-auto mb-2"
        />

        <p className="text-blue-400 italic text-lg mb-4">
          Nag-uugnay ng Puso, Nagdadala ng Pag-asa
        </p>

        <h1 className="text-5xl font-bold mb-6">
          Send Money Home Faster with Stellar
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mb-8">
          Empowering Overseas Filipino Workers (OFWs)
          to send money home instantly, securely,
          and at lower costs using blockchain-powered
          remittances.
        </p>

        <div className="flex gap-4">
          <button className="border px-6 py-3 rounded-lg">
            Get Started
          </button>

          <button className="border px-6 py-3 rounded-lg">
            Learn More
          </button>
        </div>

      </div>

      {/* FEATURES SECTION */}

        <section
            id="features"
            className="mt-24 text-center w-full max-w-6xl"
          >

        <h2 className="text-3xl font-bold mb-8">
          Why Choose eKayaLink?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="border rounded-lg p-6">
            <div className="text-4xl">⚡</div>

            <h3 className="font-bold mt-3">
              Fast Transfers
            </h3>

            <p>
              Send funds within seconds using Stellar.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <div className="text-4xl">💸</div>

            <h3 className="font-bold mt-3">
              Low Fees
            </h3>

            <p>
              Affordable remittance costs for OFWs.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <div className="text-4xl">🔒</div>

            <h3 className="font-bold mt-3">
              Secure
            </h3>

            <p>
              Blockchain-powered security and transparency.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <div className="text-4xl">📱</div>

            <h3 className="font-bold mt-3">
              Easy to Use
            </h3>

            <p>
              Connect your wallet and send money instantly.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}