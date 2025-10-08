import { Card, CardContent } from "@/components/ui/card";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Impermeabilização de Piscina Residencial",
      description: "Projeto completo de impermeabilização com sistema de alta performance",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop"
    },
    {
      title: "Impermeabilização de Laje Comercial",
      description: "Solução para edificação comercial com garantia estendida",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=500&h=300&fit=crop"
    },
    {
      title: "Tratamento de Infiltrações",
      description: "Correção de problemas de infiltração em residência",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&h=300&fit=crop"
    },
    {
      title: "Impermeabilização de Fundação",
      description: "Proteção completa de fundações contra umidade",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Projetos Realizados
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos nossos principais projetos de impermeabilização
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-pollimper-navy/20 group-hover:bg-pollimper-navy/40 transition-colors duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;