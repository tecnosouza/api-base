import Slider from "react-slick";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PortfolioSection = () => {
  const portfolioItems = [
    {
      name: "Condomínio Quinta da Baroneza",
      imageUrl:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
    },
    {
      name: "Residência de Maria Louise Loboda Latorre",
      imageUrl:
        "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=300&fit=crop",
    },
    {
      name: "Residencial Giverny",
      imageUrl:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
    },
    {
      name: "Condomínio Villa Toscana",
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    },
    {
      name: "Residencial Jardim Europa",
      imageUrl:
        "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=300&fit=crop",
    },
  ];

  // Setas customizadas para ficarem ao lado do slide central, bem juntinhas
  const PrevArrow = (props: any) => {
    const { onClick, currentSlide } = props;
    // Ocultar seta se for no primeiro slide (opcional)
    return (
      <button
        className="absolute z-20 top-[40%] -translate-y-1/2 rounded-full w-12 h-12 bg-[#59C700] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ left: "calc(45% - 180px)" }} // ajustar para ficar colado no slide da esquerda
        onClick={onClick}
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick, currentSlide, slideCount } = props;
    // Ocultar seta se for no último slide (opcional)
    return (
      <button
        className="absolute z-20 top-[40%] -translate-y-1/2 rounded-full w-12 h-12 bg-[#59C700] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ right: "calc(45% - 180px)" }} // ajustar para ficar colado no slide da direita
        onClick={onClick}
        aria-label="Próximo"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    );
  };

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 relative">
        <h2
          className="text-6xl font-bold text-center mb-16"
          style={{ color: "#59C700" }}
        >
          Portfólio
        </h2>

        <div className="relative">
          <Slider {...settings}>
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="focus:outline-none"
                style={{ transition: "transform 0.3s ease" }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-lg h-80 bg-gray-300">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-white rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="bg-pollimper-navy text-white px-6 py-3 rounded-full text-center max-w-xs">
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="text-center mt-12">
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

        <style>{`
          /* Diminuir os slides laterais */
          .slick-slide > div {
            transform: scale(0.8);
            opacity: 0.7;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }
          /* Slide central normal e em destaque */
          .slick-center > div {
            transform: scale(1);
            opacity: 1;
            z-index: 10;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }
        `}</style>
      </div>
    </section>
  );
};

export default PortfolioSection;
