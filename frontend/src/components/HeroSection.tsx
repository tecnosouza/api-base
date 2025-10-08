
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-[#013068] text-white overflow-hidden min-h-screen">


      {/* Conteúdo */}
      <div className="relative z-10 max-w-[80%] mx-auto pt-40 pb-16 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl lg:text-6xl	font-medium leading-tight mt-12 mb-8 font-riveruta">
            Soluções em<br />
            <span className="text-white lg:text-7xl font-bold">engenharia de</span><br />
            <span className="text-white lg:text-7xl font-bold">impermeabilização</span>
          </h1>

          <Button
            asChild
            className="bg-pollimper-green hover:bg-pollimper-light-green text-polimper-navy font-bold px-8 py-4 text-base md:text-lg rounded-full transition-all duration-300  hover:scale-105"
          >
            <a
              href="https://api.whatsapp.com/send?phone=5511989597954"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#013068]"
            >
              Clique e saiba mais
            </a>
          </Button>
        </div>
      </div>

      {/* Imagem da piscina no fundo (parte inferior) */}
      <div
        className="absolute inset-0 z-0 "
        style={{
          backgroundImage: `url('/lovable-uploads/piscina.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </section>
  );
};

export default HeroSection;
