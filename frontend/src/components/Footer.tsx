import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pollimper-navy text-white z-1000">
      {/* Green top bar */}
      <div className="bg-pollimper-green py-4">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-white text-lg">
            <span className="font-bold">Agende uma visita</span> e saiba como podemos ajudar no seu próximo projeto.
          </p>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mx-12">
            {/* Logo */}
            <Link to="/" className="text-white">
              <h1 className="text-2xl font-bold">
                <img
                  src="/lovable-uploads/logo-pollimper-cinza.png"
                  alt="Fachada Pollimper"
                  className="w-full max-w-[300px] h-auto object-contain"
                />
              </h1>
            </Link>

            {/* Separator */}
            <div className="hidden md:block w-[2px] h-12 bg-white" />


            {/* Address and contact info */}
            <div className="flex-1 text-start space-y-2">
              <p className="text-white/90 text-sm">
                Rua Prof. João Luiz de Campos, 172, Vianelo - Jundiaí
              </p>
              <div className="flex flex-col sm:flex-row items-start justify-start gap-6 text-white/90 text-sm">
                <div className="flex items-start gap-2">
                  <span>Fale conosco:</span>
                  <Phone className="w-4 h-4" />
                  <span>(11) 2709-4259</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@pollimper.com.br</span>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="hidden md:block w-[2px] h-12 bg-white" />

            {/* Social media icons */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/pollimper/"
                  className="w-8 h-8 text-white hover:text-green-600 transition-colors duration-300"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <Instagram className="w-full h-full" />
                </a>
                <a
                  href="https://www.facebook.com/polliecandido/"
                  className="w-8 h-8 text-white hover:text-green-600 transition-colors duration-300"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <Facebook className="w-full h-full" />
                </a>
                <a
                  href="https://www.linkedin.com/company/polli-candido"
                  className="w-8 h-8 text-white hover:text-green-600 transition-colors duration-300"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-full h-full" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
