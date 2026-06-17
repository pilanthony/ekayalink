import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      
     <Image
        src="/eKayaLinkLogo.png"
        alt="eKayaLink Logo"
        width={350}
        height={120}
        className="mx-auto mb-2"
      />

<p className="text-xl text-blue-400 italic mb-4">
  Nag-uugnay ng Puso, Nagdadala ng Pag-asa
</p>

<p className="text-lg max-w-3xl mx-auto">
  Empowering Overseas Filipino Workers (OFWs) to send money home
  faster, cheaper, and more securely through Stellar-powered digital remittances.
</p>

      <div className="mt-8 flex gap-4">
       
       
       <Link href="/login">
        <button className="px-6 py-3 rounded-lg border hover:bg-white hover:text-black transition">
          Get Started
        </button>
      </Link>
       
        <Link href="/test-stellar">
          <button className="px-6 py-3 rounded-lg border hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </Link>

      </div>
    </main>
  );
}