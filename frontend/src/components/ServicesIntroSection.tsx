import { Button } from "@/components/ui/button";

const ServicesIntroSection = () => {
  return (
    <section className="py-0 bg-white relative overflow-hidden">
      <div className="w-full bg-[#002F6C]">
        <div className="grid lg:grid-cols-10 bg-[#002F6C] gap-0 overflow-hidden max-w-[1200px] mx-auto">
          {/* Left content - Blue background */}
          <div className="lg:col-span-6 text-white py-20 px-4 lg:pl-24 lg:pr-16 flex flex-col justify-center relative">
            <h2 className="text-5xl lg:text-6xl font-bold mb-12" style={{ color: '#6CD400' }}>
              Nossos serviços
            </h2>

            <h3 className="text-xl font-bold text-white/70 mb-4">
              Impermeabilização de obras civis
            </h3>

            <p className="text-sm lg:text-base text-white/90 leading-relaxed">
              Utilizamos as melhores técnicas e materiais
            </p>

            <p className="text-sm lg:text-base text-white/90 leading-relaxed">
              para proteger suas construções contra fluidos,
            </p>

            <p className="text-sm lg:text-base text-white/90 mb-12 leading-relaxed">
              vapores e umidade.
            </p>

            <div>
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
          </div>

          {/* Right content - Image */}
          <div className="lg:col-span-4 relative">
            <div className="h-full max-h-screen relative">
              <img
                src="/lovable-uploads/aplicando-manta-asfaltica.png"
                alt="Profissional aplicando manta asfáltica"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntroSection;
