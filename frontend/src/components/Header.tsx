import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";

const Header = ({ transparent = false }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNossaLojaDropdownOpen, setNossaLojaDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => location.pathname === path;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { label: "Atuação", icon: <ChevronDown className="w-3 h-3 ml-1" /> },
    // Comentado a pedido da empresa
    // { path: "/portfolio", label: "Portfólio" },
    { label: "Nossa loja", icon: <ChevronDown className="w-3 h-3 ml-1" /> },
    { path: "/contato", label: "Contato" },
  ];

  const atuacaoSubmenu = [
    { label: "Impermeabilização de obras civis", path: "/atuacao/impermeabilizacao" },
    { label: "Obras de reformas em impermeabilização", path: "/atuacao/obras-civis" },
    { label: "Recuperação de estruturas de concreto", path: "/atuacao/estruturas" },
    { label: "Injeção química", path: "/atuacao/injecao" },
  ];

  const nossaLojaSubmenu = [ // Novo submenu
    { label: "Aditivos + adesivos", path: "/nossa-loja/produtos/aditivos-adesivos" },
    { label: "Argamassas poliméricas para impermeabilização", path: "/nossa-loja/produtos/argamassas-polimericas" },
    { label: "Selantes", path: "/nossa-loja/produtos/selantes" },
    { label: "Acrílicos (manta líquida) e masquite", path: "/nossa-loja/produtos/acrilicos" },
    { label: "Membrana auto adesivas alumínio", path: "/nossa-loja/produtos/membrana-auto-adesivas" },
    { label: "Mantas asfálticas", path: "/nossa-loja/produtos/mantas-asfalticas" },
    { label: "Primer", path: "/nossa-loja/produtos/primer" },
    { label: "Recuperação estrutural e impermeabilização", path: "/nossa-loja/produtos/recuperacao-estrutural" },
  ];

  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 500) {
        setIsTransparent(false); // Scrollou => Header sólido
      } else {
        setIsTransparent(true); // Topo => Header transparente
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-8 pb-6 pt-8 border-b border-white/0 ${isTransparent ? "bg-transparent" : "bg-pollimper-navy/95 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-[1200px] 2xl:max-w-[1500px] mx-auto flex items-center justify-between mt-4">
        {/* Logo */}
        <Link to="/" className="text-white" onClick={scrollToTop}>
          <h1 className="text-2xl font-bold">
            <img
              src="/lovable-uploads/logo-pollimper.png"
              alt="Fachada Pollimper"
              className="w-full max-w-[250px] h-auto object-contain"
            />
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex max-h-8 mr-20 transform ">
          <div className={`flex items-center space-x-0 ${transparent ? "bg-transparent" : "bg-pollimper-navy/95 backdrop-blur-sm"} rounded-full px-2 py-2 border-2 border-pollimper-green`}>
            {navLinks.map(({ path, label, icon }) => {
              if (label === "Atuação") {
                return (
                  <div
                    key={label}
                    className="relative"
                    onMouseEnter={() => {
                      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                      setDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeout.current = setTimeout(() => {
                        setDropdownOpen(false);
                      }, 300); // 1 segundo
                    }}
                  >
                    <Button
                      variant="ghost"
                      className={`${location.pathname.includes("/atuacao")
                        ? "text-[hsl(81_76%_47%)] font-semibold"
                        : "text-white"
                        } rounded-full px-5 py-2 text-base xl:text-xl flex items-center max-h-4 `}
                    >
                      {label} {icon}
                    </Button>

                    {isDropdownOpen && (
                      <div className="absolute left-0 top-full mt-2 bg-white/50 backdrop-blur-sm text-base xl:text-xl text-gray-700 rounded-xl shadow-lg p-4 w-80 z-50">
                        {atuacaoSubmenu.map((item, index) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={scrollToTop}
                            className={`block py-2 transition-colors font-medium ${index !== atuacaoSubmenu.length - 1 ? 'border-b border-gray-700' : ''
                              } ${isActive(item.path)
                                ? 'text-blue-800 font-semibold'
                                : 'hover:text-green-600'
                              }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}

                  </div>
                );
              } else if (label === "Nossa loja") { // Nova lógica para "Nossa loja"
                return (
                  <div
                    key={label}
                    className="relative"
                    onMouseEnter={() => {
                      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                      setNossaLojaDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeout.current = setTimeout(() => {
                        setNossaLojaDropdownOpen(false);
                      }, 300);
                    }}
                  >
                    <Button
                      variant="ghost"
                      className={`${location.pathname.includes("/nossa-loja")
                        ? "text-[hsl(81_76%_47%)] font-semibold"
                        : "text-white"
                        } rounded-full px-5 py-2 text-base xl:text-xl flex items-center max-h-4 `}
                    >
                      {label} {icon}
                    </Button>

                    {isNossaLojaDropdownOpen && (
                      <div className="absolute left-0 top-full mt-2 bg-white/50 backdrop-blur-sm text-base xl:text-xl text-gray-700 rounded-xl shadow-lg p-4 w-80 z-50">
                        {nossaLojaSubmenu.map((item, index) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={scrollToTop}
                            className={`block py-2 transition-colors font-medium ${index !== nossaLojaSubmenu.length - 1 ? 'border-b border-gray-700' : ''
                              } ${isActive(item.path)
                                ? 'text-blue-600 font-semibold'
                                : 'hover:text-green-600'
                              }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}

                  </div>
                );
              }

              return (
                <Button
                  key={path}
                  variant="ghost"
                  className={`${isActive(path)
                    ? "text-[hsl(81_76%_47%)] font-semibold"
                    : "text-white"
                    } rounded-full px-5 py-2 max-h-4 text-base xl:text-xl`}
                  asChild
                >
                  <Link to={path} onClick={scrollToTop}>
                    {label} {icon}
                  </Link>
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-pollimper-navy/95 backdrop-blur-sm border-t border-pollimper-green/30 px-4 pt-4 pb-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map(({ path, label, icon }) => {
              if (label === "Atuação") {
                return (
                  <div key={label} className="space-y-2">
                    <button
                      onClick={() => setDropdownOpen(!isDropdownOpen)}
                      className="text-left w-full text-white text-base xl:text-xl font-medium px-4 py-2 flex justify-between items-center"
                    >
                      <span>{label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {isDropdownOpen && (
                      <div className="pl-6 space-y-1">
                        {atuacaoSubmenu.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                            className="block text-white/80 hover:text-green-600 text-base xl:text-xl"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else if (label === "Nossa loja") { // Nova lógica para "Nossa loja" no mobile
                return (
                  <div key={label} className="space-y-2">
                    <button
                      onClick={() => setNossaLojaDropdownOpen(!isNossaLojaDropdownOpen)}
                      className="text-left w-full text-white text-base xl:text-xl font-medium px-4 py-2 flex justify-between items-center"
                    >
                      <span>{label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform ${isNossaLojaDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {isNossaLojaDropdownOpen && (
                      <div className="pl-6 space-y-1">
                        {nossaLojaSubmenu.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                            className="block text-white/80 hover:text-green-600 text-base xl:text-xl"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base xl:text-xl font-medium rounded px-4 py-2 ${isActive(path)
                    ? "text-[hsl(81_76%_47%a)]"
                    : "text-white hover:text-green-600"
                    }`}
                >
                  {label} {icon}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
