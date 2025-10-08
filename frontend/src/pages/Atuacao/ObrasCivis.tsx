import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const ObrasCivis = () => {
  const steps = [
    {
      icon: <img src="/icons/demolicao.svg" alt="Demolição" className="h-14 w-14" />,
      title: "Demolição",
      description: "remoção de materiais antigos para preparar a superfície.",
    },
    {
      icon: <img src="/icons/preparacao.svg" alt="Preparação" className="h-14 w-14" />,
      title: "Preparação",
      description: "aplicação de argamassa regularizadora para um acabamento perfeito.",
    },
    {
      icon: <img src="/icons/impermeabilizacao.svg" alt="Impermeabilização" className="h-14 w-14" />,
      title: "Impermeabilização",
      description: "sistema adequado às necessidades do projeto.",
    },
    {
      icon: <img src="/icons/protecao-mecanica.svg" alt="Proteção mecânica" className="h-14 w-14" />,
      title: "Proteção mecânica",
      description: "garantia de durabilidade.",
    },
    {
      icon: <img src="/icons/revestimento-final.svg" alt="Revestimento final" className="h-14 w-14" />,
      title: "Revestimento final",
      description: "beleza e valorização.",
    },
  ];

  return (
    <>
      <Header transparent={true} />

      {/* HERO */}
      <section
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: "url('/lovable-uploads/obra-de-reforma-de-impermeabilizacao.jpg')",
          backgroundSize: "120%",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 gap-10 pt-48 md:pt-72">
          <div className="text-center md:text-left px-4">
            <h2 className="text-4xl md:text-7xl font-bold text-green-600 leading-tight break-words hidden md:block mb-12">
              Obras de reformas <br />em impermeabilização
            </h2>
            <h2 className="text-4xl md:text-6xl font-bold text-green-600 leading-tight break-words block md:hidden">
              Obras de reformas
            </h2>
            <h2 className="text-3xl md:text-6xl font-bold text-green-600 mb-6 leading-tight break-words block md:hidden">
              em impermeabilização
            </h2>
            <p className="text-base md:text-lg text-white leading-none">
              Desde 2012, revitalizamos e modernizamos instalações <br className="hidden md:block" />
              existentes, agregando conforto e valorização <p>patrimonial.</p>
            </p>
            <div className="mt-8">
              <a className="inline-block p-2 rounded-full bg-pollimper-green animate-bounce">
                <ChevronDown className="w-6 h-6 text-[#002F6C]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="relative bg-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pollimper-navy mb-16 leading-tight">
            Nosso Processo:
          </h3>

          {/* Linha horizontal atrás dos ícones */}
          <div className="hidden lg:block absolute top-[260px] left-1/2 transform -translate-x-1/2 lg:w-[40%] h-0.5 bg-pollimper-green z-0" />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 z-10 max-w-[1000px] mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center md:items-start text-center md:text-left font-semibold px-2 index ml-12`}
              >
                <div className="bg-pollimper-green rounded-xl p-4 mb-3 z-10">
                  {step.icon}
                </div>
                <h4 className="font-bold text-base mb-1 text-pollimper-navy">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 relative z-10">
            <Button
              className="font-bold px-8 py-4 text-lg text-[#002F6C] rounded-full transition-all duration-300 hover:scale-105 hover:text-white"
              style={{ backgroundColor: "#6CD400" }}
            >
              Entre em contato
            </Button>
            <p className="text-sm font-semibold text-gray-700 mt-2">
              para transformar sua propriedade!
            </p>
          </div>
        </div>

        {/* Semicírculo azul inferior direito */}
        {/* Triângulo decorativo fixo no fundo, mas adaptado para responsividade */}
        <div className="absolute bottom-0 right-0 w-full hidden max-w-[400px] lg:block z-0">
          <img
            src="/lovable-uploads/decoracao.png"
            alt="Triângulo decorativo"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ObrasCivis;
