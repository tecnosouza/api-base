
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
  Handshake,
  HeartHandshake,
  Star,
  BadgeCheck,
  Scale,
} from "lucide-react";
const SobreNos = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Verifica no mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  type BoxProps = {
    icon: React.ReactNode;
    text1: string;
    text2?: string; // <- opcional
  };

  const Box: React.FC<BoxProps> = ({ icon, text1, text2 }) => (
    <div className="relative flex flex-col items-center">
      <div className="absolute -top-14 bg-white p-2 rounded-full shadow-md">
        {icon}
      </div>
      <div className="bg-[#7AD800] text-[#0e2e50] rounded-[40px] pt-14 pb-6 px-6 w-60 h-40 shadow-md">
        {text2 ? (
          <>
            <p className="font-semibold text-lg pt-2">{text1}</p>
            <p className="font-semibold text-lg">{text2}</p>
          </>
        ) : (
          <p className="font-semibold text-lg pt-6">{text1}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#0e2e50]">
      <Header transparent={true} />

      {/* Seção 1: Quem somos (com imagem de fundo) */}
      <section
        className="relative text-white md:py-32 px-8 min-h-screen"
        style={{
          background: isMobile
            ? "#013068"
            : `url('/lovable-uploads/3d0208e6-167a-4f44-af65-26c2b1805173.png') center / cover no-repeat`,
        }}
      >
        <div className="max-w-7xl pt-32 md:pt-72 mx-auto grid lg:grid-cols-2 gap-16 items-center lg:pt-16">
          {/* Texto */}
          <div>
            <h1 className="text-4xl md:text-7xl lg:text-6xl font-bold text-[#7AD800] mb-8">
              Quem somos
            </h1>
            <p className="text-white text-lg leading-6 mb-8 hidden md:block">
              Na <span className="font-semibold">Pollimper</span>, somos especialistas em engenharia < br />
              de impermeabilização e recuperação estrutural.  < br />
            </p>
            <p className="text-white text-lg leading-6 mb-8 hidden md:block">
              Oferecemos soluções completas e inovadoras para  < br />
              obras civis (residenciais, comerciais e industriais), < br />
              atendendo tanto novas construções quanto reformas. < br />
            </p>
            <p className="text-white text-lg leading-6 mb-8 hidden md:block">
              Com uma equipe altamente qualificada < br />
              e experiência consolidada no mercado, garantimos < br />
              serviços de excelência para proteger, restaurar e < br />
              valorizar seus projetos.
            </p>
            <p className="text-white text-base leading-10 mb-8 block md:hidden">
              Na <span className="font-semibold">Pollimper</span>, somos especialistas em engenharia
              de impermeabilização e recuperação estrutural.
              Oferecemos soluções completas e inovadoras para
              obras civis (residenciais, comerciais e industriais),
              atendendo tanto novas construções quanto
              reformas. Com uma equipe altamente qualificada
              e experiência consolidada no mercado, garantimos
              serviços de excelência para proteger, restaurar e
              valorizar seus projetos.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 2: Nosso compromisso (fundo branco) */}
      <section className="bg-white text-center py-24 px-8 relative ">

        <h2 className="text-3xl md:text-6xl font-bold text-[#7AD800] mb-8">
          Nosso compromisso:
        </h2>
        <p className="text-base md:text-lg font-medium text-[#0e2e50] mb-12">
          Executar serviços técnicos de alta qualidade, propondo soluções<br />
          personalizadas a um preço justo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Linha 1 */}
          <div className="flex justify-center col-span-full gap-10 flex-wrap">
            {/* Responsabilidade Social */}
            <Box icon={<img src="/icons/responsabilidade-social.svg" alt="Icon" className="h-20 w-20" />} text2="Social" text1="Responsabilidade" />

            {/* Competência */}
            <Box icon={<img src="/icons/competencia.svg" alt="Icon" className="h-20 w-20" />} text1="Competência" />

            {/* Qualidade */}
            <Box icon={<img src="/icons/qualidade.svg" alt="Icon" className="h-20 w-20" />} text1="Qualidade" />
          </div>

          {/* Linha 2 */}
          <div className="flex justify-center col-span-full gap-10 flex-wrap mt-2">
            {/* Respeito */}
            <Box icon={<img src="/icons/respeito.svg" alt="Icon" className="h-20 w-20" />} text1="Respeito" />

            {/* Ética */}
            <Box icon={<img src="/icons/etica.svg" alt="Icon" className="h-20 w-20" />} text1="Ética" />
          </div>
        </div>


        {/* Decoração triangular no canto inferior direito */}
        <div className="absolute bottom-0 right-0 z-0 w-[400px] h-auto hidden lg:block">
          <img
            src="/lovable-uploads/quem-somos-triangulos.png"
            alt="Triângulo decorativo"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Seção: Nossos clientes */}
      <section className="bg-[#0e2e50] text-white text-center pt-44 px-8 min-h-screen pb-8 lg:pb-0">
        <h2 className="text-4xl md:text-6xl font-bold text-[#7AD800] mb-16">
          Nossos clientes
        </h2>
        <div className="flex flex-col items-center gap-6 max-w-6xl mx-auto">
          <h2 className="text-white text-xl font-semibold text-center mb-2">
            Empresas que confiam na Pollimper:
          </h2>

          {/* Primeira linha com 5 logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "alphaville.png",
              "cobe.png",
              "in_house.png",
              "jundiainense.png",
              "acoi.png",
            ].map((file, idx) => (
              <div key={idx} className="w-48 h-28 bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
                <img
                  src={`/clientes/${file}`}
                  alt={`Logo ${idx + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Segunda linha com 4 logos */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "faoliva.png",
              "romme.png",
              "WET'N.png",
              "galvao.jpeg",
            ].map((file, idx) => (
              <div key={idx} className="w-48 h-28 bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
                <img
                  src={`/clientes/${file}`}
                  alt={`Logo ${idx + 6}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SobreNos;
