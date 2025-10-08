import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Atuacao = () => {
  const services = [
    {
      title: "Impermeabilização de Piscinas",
      description: "Soluções completas para piscinas residenciais e comerciais, garantindo vedação perfeita e durabilidade.",
      features: ["Manta asfáltica", "Poliuretano", "Resina epóxi", "Membrana PVC"]
    },
    {
      title: "Impermeabilização de Lajes",
      description: "Proteção eficaz contra infiltrações em lajes de cobertura, garagem e área de serviço.",
      features: ["Manta líquida", "Manta asfáltica", "Poliuretano", "Sistema multicamadas"]
    },
    {
      title: "Impermeabilização de Fundações",
      description: "Proteção contra umidade em fundações, garantindo a integridade estrutural da edificação.",
      features: ["Cristalizante", "Manta asfáltica", "Emulsão asfáltica", "Drenagem francesa"]
    },
    {
      title: "Impermeabilização Industrial",
      description: "Soluções especializadas para indústrias, com alta resistência química e térmica.",
      features: ["Resinas especiais", "Membrana EPDM", "Sistema de drenagem", "Proteção química"]
    }
  ];

  return (
    <div className="min-h-screen bg-pollimper-navy">
      <Header transparent={true}/>
      <main className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Nossa <span className="text-accent">Atuação</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Oferecemos soluções completas em impermeabilização para diversos 
              segmentos, sempre com tecnologia de ponta e materiais de qualidade superior.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/50 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/80 mb-6">{service.description}</p>
                <div className="space-y-2">
                  <h4 className="text-accent font-semibold">Tecnologias utilizadas:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-white/70 text-sm">• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-8 rounded-2xl border border-accent/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Precisa de uma solução personalizada?
              </h2>
              <p className="text-white/80 mb-6">
                Nossa equipe técnica está pronta para desenvolver a solução ideal para seu projeto.
              </p>
              <button className="bg-accent text-pollimper-navy px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors">
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Atuacao;