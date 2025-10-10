import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Contato = () => {
  return (
    <div className="bg-pollimper-navy text-white">
      <Header transparent />

      {/* Hero com imagem de capa */}
      <section className="w-full h-screen relative">
        <img
          src="/lovable-uploads/contato.png"
          alt="Banner de Contato"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-md p-6 md:p-12 rounded-3xl shadow-2xl mt-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-500 mb-10 text-center">
              Fale conosco
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulário (2/3) */}
              <form
                action="https://formsubmit.co/thomasmontipo@gmail.com"
                method="POST"
                target="_blank"
                className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Desabilita captcha do FormSubmit */}
                <input type="hidden" name="_captcha" value="false" />
                {/* Opcional: redirecionamento pós-envio */}
                {/* <input type="hidden" name="_next" value="https://seusite.com/obrigado" /> */}

                <div className="col-span-1">
                  <label className="block mb-1">Nome</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Seu nome completo"
                    className="w-full p-3 rounded-md bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pollimper-green"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full p-3 rounded-md bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pollimper-green"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full p-3 rounded-md bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pollimper-green"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1">Assunto</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Ex: Solicitação de orçamento"
                    className="w-full p-3 rounded-md bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pollimper-green"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block mb-1">Mensagem</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full p-3 rounded-md bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pollimper-green"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <Button
                    type="submit"
                    className="bg-pollimper-green hover:bg-pollimper-light-green text-pollimper-navy font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Enviar mensagem
                  </Button>
                </div>

                {/* Redes sociais */}
                <div className="col-span-1 md:col-span-2 mt-6 flex justify-center gap-6">
                  <a href="https://www.facebook.com/polliecandido/" target="_blank" className="hover:text-green-400 transition-colors">
                    <Facebook size={28} />
                  </a>
                  <a href="https://www.instagram.com/pollimper/" target="_blank" className="hover:text-green-400 transition-colors">
                    <Instagram size={28} />
                  </a>
                  <a href="https://www.linkedin.com/company/polli-candido" target="_blank" className="hover:text-green-400 transition-colors">
                    <Linkedin size={28} />
                  </a>
                </div>
              </form>

              {/* Contatos adicionais (1/3) */}
              <div className="bg-white/20 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-4 text-green-400">Outros Contatos</h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <strong>Financeiro:</strong> <br />
                    (11) 98959-7954
                  </li>
                  <li>
                    <strong>Comercial:</strong> <br />
                    (11) 94792-5462
                  </li>
                  <li>
                    <strong>Administrativo:</strong> <br />
                    (11) 994041-7610
                  </li>
                  <li>
                    <strong>RH (envie seu currículo):</strong> <br />
                    (11) 98959-7954
                  </li>
                  <li>
                    Valorizamos a ética e a integridade em todas as nossas ações, guiados pelo nosso Código de Ética.
                    Baixe o código e conheça as diretrizes que fortalecem como trabalhamos. <br />
                    <a
                      href="/arquivos/codigo_conduta.pdf"
                      target="_blank"
                      rel="noopener"
                      download="codigo_conduta.pdf"
                      style={{ color: "#007BFF", textDecoration: "underline" }}
                    >
                      Baixar Código de Conduta (PDF)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
