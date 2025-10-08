import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ChevronDown,
  Droplet,
  Hammer,
  MoveDiagonal,
  Scissors,
  Shield
} from "lucide-react";
const Impermeabilizacao = () => {
  const areas = [
    {
      icon: <img src="/icons/lages-e-marquizes.svg" alt="Icon" className="h-24 w-24" />,
      title: (
        <>
          Lajes e
          <br />
          Marquises
        </>
      ),
      description: "Proteção completa contra infiltrações para garantir durabilidade e segurança.",
    },
    {
      icon: <img src="/icons/baldrames.svg" alt="Icon" className="h-24 w-24" />,
      title: "Baldrames",
      description: (
        <>
          Proteção contra umidade e infiltrações, garantindo a durabilidade
          <br />
          da fundação.
        </>
      ),
    },
    {
      icon: <img src="/icons/muros.svg" alt="Icon" className="h-24 w-24" />,
      title: "Muros",
      description: "Revestimento impermeável para evitar danos estruturais e infiltrações.",
    },
    {
      icon: <img src="/icons/piscinas.svg" alt="Icon" className="h-24 w-24" />,
      title: "Piscinas",
      description: "Soluções que asseguram estanqueidade e resistência ao desgaste contínuo.",
    },
    {
      icon: <img src="/icons/reservatorios.svg" alt="Icon" className="h-24 w-24" />,
      title: "Reservatórios",
      description: "Selagem de alta qualidade para evitar vazamentos e deterioração.",
    },
    {
      icon: <img src="/icons/floreiras.svg" alt="Icon" className="h-24 w-24" />,
      title: "Floreiras",
      description: "Técnicas para evitar infiltração e preservar a estrutura.",
    },
    {
      icon: <img src="/icons/fontes.svg" alt="Icon" className="h-24 w-24" />,
      title: "Fontes",
      description: "Impermeabilização para garantir a estanqueidade e a funcionalidade.",
    },
    {
      icon: <img src="/icons/fachadas-e-paredes.svg" alt="Icon" className="h-24 w-24" />,
      title: "Fachadas e Paredes",
      description: (
        <>
          Soluções que evitam infiltrações <br />e preservam a estética<br />
          e a estrutura do imóvel.
        </>
      ),
    },
    {
      icon: <img src="/icons/juntas-de-dilatacao.svg" alt="Icon" className="h-24 w-24" />,
      title: "Juntas de dilatação",
      description: "Tratamento especializado para garantir flexibilidade e vedação.",
    },
  ];

  const reparos = [
    {
      icon: <Droplet className="w-10 h-10 text-[#7AD800]" />,
      title: "Reparos em impermeabilização",
      description: "Correção de falhas para restaurar a eficácia do sistema.",
    },
    {
      icon: <Scissors className="w-10 h-10 text-[#7AD800]" />,
      title: "Calafetação de\ntrincas",
      description: "Selagem de trincas para evitar infiltrações e comprometimentos estruturais.",
    },
    {
      icon: <MoveDiagonal className="w-10 h-10 text-[#7AD800]" />,
      title: "Tratamento em juntas de dilatação",
      description: "Reparos que garantem vedação e flexibilidade adequadas.",
    },
    {
      icon: <Hammer className="w-10 h-10 text-[#7AD800]" />,
      title: "Tratamento de concreto aparente",
      description: "Restauração estética e estrutural do concreto exposto.",
    },
    {
      icon: <Shield className="w-10 h-10 text-[#7AD800]" />,
      title: "Tratamento de Concreto Armado",
      description: "Preservação da estrutura contra corrosão e desgaste, prolongando sua resistência.",
    },
  ];

  return (
    <>
      <Header transparent={true} />

      {/* Capa */}
      <section
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white px-6 py-20 md:py-32"
        style={{
          backgroundImage: "url('/lovable-uploads/impermeabilizacao-de-obras-civis.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 pt-44">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-green-600 leading-tight">
              Impermeabilização
            </h2>
            <h2 className="text-4xl md:text-6xl font-bold text-green-600 mb-6 leading-tight">
              de obras civis
            </h2>
            <p className="text-base text-white font-semibold md:text-lg">
              Utilizamos as melhores técnicas e materiais para<br /> proteger suas construções contra fluidos, vapores e<br /> umidade.
            </p>
            <div className="mt-8">
              <a className="inline-block p-2 rounded-full bg-pollimper-green animate-bounce">
                <ChevronDown className="w-6 h-6 text-[#002F6C]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas atendidas */}
      <section className="bg-white text-center py-24 px-8 relative">
        <h2 className="text-4xl md:md:text-6xl font-bold text-[#7AD800] md:-ml-20 mb-20">
          Impermeabilização
        </h2>

        <div className="flex flex-col items-center">
          {/* Primeira linha: 6 itens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 max-w-5xl mx-auto mb-10">
            {areas.slice(0, 5).map((item, index) => (
              <div key={index} className="flex flex-col items-start text-[#0e2e50] text-start">
                <div className="bg-[#013068] rounded-3xl flex items-start justify-start">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base md:text-xl mt-4 mb-1 text-black leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#0e2e50] font-semibold leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Segunda linha: 4 itens centralizados */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-3xl mx-auto">
            {areas.slice(5).map((item, index) => (
              <div key={index} className="flex flex-col items-start text-[#0e2e50] text-start">
                <div className="bg-[#013068] p-2 md:p-4 rounded-3xl flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base md:text-xl mt-4 mb-1 text-black leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#0e2e50] font-semibold leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-0 w-[300px] h-auto hidden lg:block">
          <img
            src="/lovable-uploads/quem-somos-triangulos.png"
            alt="Triângulo decorativo"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Reparos e tratamentos */}
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat px-6 flex"
        style={{
          backgroundImage: "url('/lovable-uploads/reparos-e-treinamentos.png')",
        }}
      >
        <div className="absolute bg-black/30" />
        <div className="relative max-w-7xl mx-auto text-center scale-75">
          <h2 className="text-5xl md:text-[85px] font-bold text-green-600 mb-20">
            Reparos e Tratamentos
          </h2>

          <div className="max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center gap-16">
            {reparos.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-end mb-6 justify-between bg-white rounded-sm p-6 shadow-lg h-[300px] w-[300px] md:mb-4 ${index == 1 ? 'mx-4' : ''}`}
              >
                <div className="w-full">
                  <h3 className="font-bold text-lg md:text-2xl text-[#0e2e50] mt-4 mb-2 text-left">
                    {item.title.split('\n').map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h3>
                  <hr className="border-t-2 border-[#0e2e50] w-24 mb-4" />
                  <p className="text-base text-start text-[#0e2e50] font-semibold">{item.description}</p>
                </div>
              </div>
            ))}

            <div className="md:col-span-3 flex flex-col md:flex-row justify-center gap-6 mt-8">
              {reparos.slice(3).map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-end mb-6 justify-between bg-white rounded-sm p-6 shadow-lg h-[300px] w-[300px] md:mb-4 ${index == 1 ? 'mx-4' : ''}`}
                >
                  <div className="w-full">
                    <h3 className="font-bold text-lg md:text-2xl text-[#0e2e50] mt-4 mb-2 text-left">
                      {item.title.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </h3>
                    <hr className="border-t-2 border-[#0e2e50] w-10 mb-4" />
                    <p className="text-base text-start text-[#0e2e50] font-semibold">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Serviços adicionais */}
      <section className="relative w-full text-[#013068]">
        {/* Imagem desktop (visível somente em md+) */}
        <img
          src="/lovable-uploads/servicos-adicionais.png"
          alt="Serviços adicionais"
          className="hidden md:block w-full h-auto"
        />

        {/* Imagem mobile (visível somente em < md) */}
        <img
          src="/lovable-uploads/servicos-adicionais-mobile.png"
          alt="Serviços adicionais (mobile)"
          className="block md:hidden w-full h-auto"
        />

        {/* Conteúdo sobreposto */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {/* Coloque aqui seu conteúdo sobreposto */}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Impermeabilizacao;
