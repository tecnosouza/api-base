import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="py-20 min-h-screen bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Left content */}
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-bold text-green-600 mb-12">
              Quem somos
            </h2>

            <p className="text-gray-700 text-lg font-medium leading-6 mb-12">
              Na <span className="font-bold">Pollimper</span>, somos especialistas em engenharia <br />
              de impermeabilização e recuperação estrutural. <br />
              Oferecemos soluções completas e inovadoras para <br />
              obras civis (residenciais, comerciais e industriais), <br />
              atendendo tanto novas construções quanto reformas.
            </p>

            {/* Fachada visível apenas em telas médias ou menores */}
            <div className="lg:hidden mb-10">
              <img
                src="/lovable-uploads/pollimper-fachada.png"
                alt="Fachada Pollimper"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>

            <Button
              asChild
              className="bg-pollimper-green hover:bg-pollimper-light-green text-pollimper-navy font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <a
                href="https://api.whatsapp.com/send?phone=5511989597954"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais
              </a>
            </Button>
          </div>

          {/* Fachada visível somente em telas grandes */}
          <div className="hidden lg:block relative z-0">
            <img
              src="/lovable-uploads/pollimper-fachada.png"
              alt="Fachada Pollimper"
              className="w-full max-w-[450px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Triângulo decorativo fixo no fundo, mas adaptado para responsividade */}
      <div className="absolute bottom-0 right-0 w-full hidden max-w-[520px] sm:block z-0">
        <img
          src="/lovable-uploads/quem-somos-triangulos-grandes.png"
          alt="Triângulo decorativo"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default AboutSection;
