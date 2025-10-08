"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const Injecao = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <>
      <Header transparent={true} />

      {/* Capa */}
      {/* <section
                className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white px-6 py-20 md:py-32"
                style={{
                    backgroundImage: `url('/lovable-uploads/injecao.png')`,
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 pt-32 md:pt-40">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-green-600 leading-tight">
                            Injeção química
                        </h2>
                        <p className="text-base text-white font-semibold md:text-lg mt-10">
                            Tratamento de infiltrações com método não<br />
                            destrutivo
                        </p>
                        <p className="text-base text-white md:text-lg mt-6">
                            A <strong>Pollimer</strong> utiliza o exclusivo sistema de injeção<br />
                            química por Alta Vazão (IQ-AP), que resolve<br />
                            infiltrações e vazamentos de forma definitiva.
                        </p>
                        <div className="mt-8">
                            <a className="inline-block p-2 rounded-full bg-pollimper-green animate-bounce">
                                <ChevronDown className="w-6 h-6 text-[#002F6C]" />
                            </a>
                        </div>
                    </div>
                </div>
            </section> */}

      <section
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white px-6 py-20 md:py-32"
        style={{
          backgroundImage: "url('/lovable-uploads/injecao.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-green-600 leading-tight  pt-48">
              Injeção química
            </h2>
            <p className="text-base text-white font-semibold md:text-base mt-10">
              Tratamento de infiltrações com método não<br /> destrutivo
            </p>
            <p className="text-base text-white md:text-base mt-6">
              A <strong>Pollimer</strong> utiliza o exclusivo sistema de injeção<br />
              química por Alta Vazão (IQ-AP), que resolve<br />
              infiltrações e vazamentos de forma definitiva.
            </p>
            <div className="mt-8">
              <a className="inline-block p-2 rounded-full bg-pollimper-green animate-bounce">
                <ChevronDown className="w-6 h-6 text-[#002F6C]" />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Diferenciais */}
      <section
        className={`relative w-full text-[#013068] ${isMobile ? "min-h-screen flex items-center justify-center" : ""
          }`}
      >
        <img
          src={
            isMobile
              ? "/lovable-uploads/diferenciais-mobile-2.png"
              : "/lovable-uploads/diferenciais.png"
          }
          alt="Diferenciais"
          className={`w-full ${isMobile ? "h-screen object-cover" : "h-auto"
            }`}
        />

        <div className="absolute inset-0 flex items-start md:items-start justify-center pt-10 md:pt-0 lg:pt-4 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#003068] leading-tight pt-10">
            Diferenciais
          </h2>
        </div>
      </section>

      {/* Aplicações */}
      <section
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white px-6 py-20 md:py-32"
        style={{
          backgroundImage: `url('${isMobile
            ? "/lovable-uploads/aplicacoes-mobile.png"
            : "/lovable-uploads/aplicacoes.png"
            }')`,
        }}
      >
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:pt-10">
          <div className="ml-20">
            <h2 className="text-5xl md:text-6xl font-bold text-green-600 leading-tight ">
              Aplicações
            </h2>
            <p className="text-base text-white font-semibold md:text-base mt-4 md:mt-4 mb-16">
              Garagens, fossos de elevadores,<br />
              reservatórios e mais.
            </p>
            <Button
              asChild
              className="bg-pollimper-green hover:bg-pollimper-light-green text-pollimper-navy font-semibold px-8 py-4 text-sm md:text-base rounded-full transition-all duration-300 hover:scale-105"
            >
              <a
                href="https://api.whatsapp.com/send?phone=5511989597954"
                target="_blank"
                rel="noopener noreferrer"
              >
                Faça uma consulta gratuita
              </a>
            </Button>
            <p className="text-base text-white font-normal md:text-base">
              e descubra como eliminar infiltrações<br />
              hoje mesmo!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Injecao;
