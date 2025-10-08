import { CheckCircle, Shield, Droplets, Building } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Shield className="w-12 h-12 text-accent" />,
      title: "Impermeabilização de Piscinas",
      description: "Soluções completas para impermeabilização de piscinas residenciais e comerciais com garantia de qualidade."
    },
    {
      icon: <Building className="w-12 h-12 text-accent" />,
      title: "Impermeabilização de Estruturas",
      description: "Proteção eficaz para edificações, lajes, fundações e estruturas contra infiltrações."
    },
    {
      icon: <Droplets className="w-12 h-12 text-accent" />,
      title: "Tratamento de Infiltrações",
      description: "Diagnóstico e correção de problemas de infiltração em residências e empresas."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-accent" />,
      title: "Consultoria Especializada",
      description: "Assessoria técnica em projetos de impermeabilização com foco em qualidade e durabilidade."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas em impermeabilização com tecnologia avançada e equipe especializada
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-lg shadow-lg border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;