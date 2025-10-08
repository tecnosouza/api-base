import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ArrowDown, ChevronDown } from "lucide-react";

interface Produto {
  imagem: string;
  titulo: string;
  descricao: string;
  valores: string;
  aplicacoes: string;
}

const Produtos = () => {
  const nossaLojaSubmenu = [
    { label: "Aditivos + adesivos", subLabel: "", path: "aditivos-adesivos" },
    { label: "Argamassas poliméricas para impermeabilização", subLabel: "", path: "argamassas-polimericas" },
    { label: "Selantes", subLabel: "", path: "selantes" },
    { label: "Acrílicos e masquite", subLabel: "(Manta líquida)", path: "acrilicos" },
    { label: "Membrana auto adesivas alumínio", subLabel: "", path: "membrana-auto-adesivas" },
    { label: "Mantas asfálticas", subLabel: "", path: "mantas-asfalticas" },
    { label: "Primer", subLabel: "", path: "primer" },
    { label: "Recuperação estrutural e impermeabilização", subLabel: "", path: "recuperacao-estrutural" },
  ];

  const { produto } = useParams();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const visibleCount = 6;
  const tituloProduto = nossaLojaSubmenu.find((item) => item.path === produto)?.label || "Nossos Produtos";
  const subTituloProduto = nossaLojaSubmenu.find((item) => item.path === produto)?.subLabel || "Nossos Produtos";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const module = await import(`../../data/produtos/${produto}.json`);
        setProdutos(module.default);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProdutos([]);
      }
    };

    if (produto) {
      loadProducts();
    } else {
      setProdutos([]);
    }
  }, [produto]);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => setSelectedIndex(carouselApi.selectedScrollSnap());
    onSelect();

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <>
      <Header transparent={true} />

      <section
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white px-6 py-20 md:py-32 bg-blue-900/90"
        style={{
          backgroundImage: "url('/lovable-uploads/rear-view-man-standing-against-window.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pt-48 md:pt-72">
          <div className="text-center md:text-left px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-green-600 leading-tight break-words hidden md:block mb-12">
              Nossa loja <br />
            </h2>
            <h2 className="text-3xl md:text-6xl font-bold text-green-600 mb-6 leading-tight break-words block md:hidden">
              em impermeabilização
            </h2>
            <p className="text-base md:text-lg text-white leading-snug max-w-xl mx-auto md:mx-0">
              Conheça toda a nossa linha de produtos e entre em contato pelo WhatsApp para adquirir o que você precisa. Na Pollimper, trabalhamos com o melhor para a sua obra.
            </p>
            <div className="mt-8">
              <a className="inline-block p-2 rounded-full bg-pollimper-green animate-bounce">
                <ChevronDown className="w-6 h-6 text-[#002F6C]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="relative bg-pollimper-navy py-20 sm:py-36 overflow-visible px-4">
        <div className="text-center w-full">
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight">
            {tituloProduto}
          </h3>
          <h4 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 sm:mb-8 leading-tight">
            {subTituloProduto}
          </h4>

          <div className="w-24 sm:w-40 h-1 sm:h-0.5 bg-green-500 mx-auto mb-10 sm:mb-16 rounded" />

          {produtos.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
                slidesToScroll: 1,
                containScroll: "trimSnaps",
                loop: false
              }}
              setApi={setCarouselApi}
              className="w-full overflow-visible"
            >
              <CarouselContent className={`!ml-0 flex w-full gap-4 ${produtos.length < visibleCount ? "justify-center" : "justify-start"}`}>
                {produtos.map((product, index) => {
                  const highlightStart = selectedIndex + 1;
                  const highlightEnd = selectedIndex + 5;

                  const isLastVisible = index === produtos.length - 1 && index >= selectedIndex;
                  const isHighlighted =
                    produtos.length <= visibleCount ||
                    (index >= highlightStart && index < highlightEnd) ||
                    (selectedIndex === 0 && index === 0) ||
                    isLastVisible;

                  return (
                    <CarouselItem
                      key={index}
                      className={`w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 px-2 transition-transform duration-300 ease-in-out ${isHighlighted ? "scale-100 opacity-100" : "scale-90 opacity-40"
                        }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="bg-white rounded-3xl p-4 shadow-lg flex justify-center items-center w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px]">
                          <img
                            src={product.imagem}
                            alt={product.titulo}
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                        <h4 className="mt-4 text-green-600 text-lg sm:text-xl font-bold text-center uppercase px-2">
                          {product.titulo}
                        </h4>
                        <Popover onOpenChange={(open) => open && setSelectedProduct(product)}>
                          <PopoverTrigger asChild>
                            <button className="mt-2 bg-pollimper-green text-white rounded-full px-5 py-2 text-sm sm:text-base font-semibold flex items-center gap-2 hover:bg-pollimper-green/90 transition">
                              <span className="text-blue-900">Veja mais</span>
                              <span className="flex justify-center items-center w-6 h-6 bg-white rounded-full">
                                <ArrowDown className="w-3.5 h-3.5 text-blue-900" />
                              </span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            side="bottom"
                            sideOffset={12}
                            align="center"
                            className="relative max-w-xs sm:max-w-sm bg-white text-pollimper-navy p-5 rounded-xl shadow-lg"
                          >
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-md z-[-1]" />
                            <div className="grid gap-4 text-left text-sm max-h-60 overflow-y-auto">
                              {selectedProduct?.descricao && (
                                <div>
                                  <h5 className="font-bold text-xs mb-1">DESCRIÇÃO:</h5>
                                  <p>{selectedProduct.descricao}</p>
                                </div>
                              )}
                              {selectedProduct?.valores && (
                                <div>
                                  <h5 className="font-bold text-xs mb-1">VALORES:</h5>
                                  <p>{selectedProduct.valores}</p>
                                </div>
                              )}
                              {selectedProduct?.aplicacoes && (
                                <div>
                                  <h5 className="font-bold text-xs mb-1">APLICAÇÕES:</h5>
                                  <p>{selectedProduct.aplicacoes}</p>
                                </div>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                        <a
                          href="https://api.whatsapp.com/send?phone=5511989597954"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 w-12 h-12 rounded-full flex justify-center items-center hover:bg-pollimper-green hover:text-white transition"
                          aria-label="Contato WhatsApp"
                        >
                          <img src="/icons/whatss.svg" alt="WhatsApp" className="h-6 w-6" />
                        </a>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex justify-between items-center w-full mt-6 px-6">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          ) : (
            <p className="text-white text-lg">Nenhum produto encontrado para esta categoria.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Produtos;
