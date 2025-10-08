import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ChevronDown
} from "lucide-react";

const Estruturas = () => {
  return (
    <>
      <Header transparent={true} />

      <section
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white px-6 py-20 md:py-32"
        style={{
          backgroundImage: "url('/lovable-uploads/male-worker-screeding-floor-construction-site.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 pt-44">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-green-600 leading-tight mb-16">
              Recuperação de <span className="whitespace-nowrap">estruturas de concreto</span>
            </h2>
            <div className="mt-8">
              <a className="inline-block p-2 rounded-full bg-pollimper-green animate-bounce">
                <ChevronDown className="w-6 h-6 text-[#002F6C]" />
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* Restauração estrutural */}
      <section className="relative w-full text-[#013068]">
        {/* Imagem desktop (visível somente em md+) */}
        <img
          src="/lovable-uploads/restauracao-estrutural.png"
          alt="Serviços adicionais"
          className="hidden md:block w-full h-auto"
        />

        {/* Imagem mobile (visível somente em < md) */}
        <img
          src="/lovable-uploads/restauracao-estrutural-mobile.png"
          alt="Serviços adicionais (mobile)"
          className="block md:hidden w-full h-auto"
        />

        {/* Conteúdo sobreposto */}
        <div className="absolute inset-0 flex items-center justify-center px-6" />
      </section>

      {/* Isolação termica */}
      <section className="relative w-full text-[#013068]">
        {/* Imagem desktop (visível somente em md+) */}
        <img
          src="/lovable-uploads/isolacao-termica.png"
          alt="Serviços adicionais"
          className="hidden md:block w-full h-auto"
        />

        {/* Imagem mobile (visível somente em < md) */}
        <img
          src="/lovable-uploads/isolacao-termica-mobile.png"
          alt="Serviços adicionais (mobile)"
          className="block md:hidden w-full h-auto"
        />

        {/* Conteúdo sobreposto */}
        <div className="absolute inset-0 flex items-center justify-center px-6" />
      </section>

      <Footer />
    </>
  );
};

export default Estruturas;
