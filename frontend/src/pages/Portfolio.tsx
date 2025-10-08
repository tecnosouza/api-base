// import React from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// export default function ObrasRealizadas() {
//   return (
//     <div className="flex flex-col min-h-screen bg-[#002F6C] text-white">
//       <Header transparent={true}/>

//       <main className="flex flex-col items-center px-4 pb-16 pt-32">
//         <div className="w-full max-w-5xl flex flex-col gap-16">
//           <h1 className="text-4xl font-bold text-lime-400">
//             Obras realizadas
//           </h1>

//           {/* Primeiro bloco */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
//   {/* Imagem para Mobile */}
//   <img
//     src="https://placehold.co/250x125"
//     alt="Logo 1"
//     className="block md:hidden rounded rounded-sm"
//   />

//   {/* Imagem para Desktop */}
//   <img
//     src="https://placehold.co/600x300"
//     alt="Logo 1"
//     className="hidden md:block rounded rounded-sm"
//   />            <div className="w-full md:w-1/2 flex flex-col">
//               <h2 className="text-lime-400 font-semibold mb-2">
//                 Condomínio Quinta da Baroneza
//               </h2>
//               <span className="text-sm font-semibold mb-1">27/10/2015</span>
//               <div className="w-10 border-b-2 border-white mb-4"></div>
//               <p className="mb-4 text-sm leading-relaxed">
//                 Executamos a reforma completa da <br />
//                 impermeabilização do tanque principal <br />
//                 da Estação de Tratamento de Esgoto, <br />
//                 garantindo máxima eficiência e <br />
//                 durabilidade para as operações do condomínio.
//               </p>
//               <button className="bg-lime-400 text-[#002F6C] px-4 py-2 rounded-full text-sm font-semibold w-fit">
//                 Veja mais
//               </button>
//             </div>
//           </div>

//           {/* Segundo bloco */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:flex-row-reverse">
//             <img src="https://placehold.co/600x300" alt="Logo 1" className="rouded rounded-sm" />
//             <div className="w-full md:w-1/2 flex flex-col">
//               <h2 className="text-lime-400 font-semibold mb-2">
//                 Residencial Giverny
//               </h2>
//               <span className="text-sm font-semibold mb-1">27/10/2015</span>
//               <div className="w-10 border-b-2 border-white mb-4"></div>
//               <p className="mb-4 text-sm leading-relaxed">
//                 Realizamos a impermeabilização integral <br />
//                 do empreendimento, desde a fundação <br />
//                 até a cobertura, utilizando técnicas <br />
//                 avançadas que proporcionam segurança <br />
//                 estrutural e valorização do projeto.
//               </p>
//               <button className="bg-lime-400 text-[#002F6C] px-4 py-2 rounded-full text-sm font-semibold w-fit">
//                 Veja mais
//               </button>
//             </div>
//           </div>

//           {/* Terceiro bloco */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
//             <img src="https://placehold.co/600x300" alt="Logo 1" className="rouded rounded-sm" />
//             <div className="w-full md:w-1/2 flex flex-col">
//               <h2 className="text-lime-400 font-semibold mb-2">
//                 Residencial Cartagena e Medellin
//               </h2>
//               <span className="text-sm font-semibold mb-1">27/10/2015</span>
//               <div className="w-10 border-b-2 border-white mb-4"></div>
//               <p className="mb-4 text-sm leading-relaxed">
//                 Executamos a reforma completa da <br />
//                 impermeabilização do tanque principal <br />
//                 da Estação de Tratamento de Esgoto, <br />
//                 garantindo máxima eficiência e <br />
//                 durabilidade para as operações do condomínio.
//               </p>
//               <button className="bg-lime-400 text-[#002F6C] px-4 py-2 rounded-full text-sm font-semibold w-fit">
//                 Veja mais
//               </button>
//             </div>
//           </div>

//           {/* Quarto bloco */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:flex-row-reverse">
//             <img src="https://placehold.co/600x300" alt="Logo 1" className="rouded rounded-sm" />
//             <div className="w-full md:w-1/2 flex flex-col">
//               <h2 className="text-lime-400 font-semibold mb-2">
//                 Residência de Maria Louise Loboda Latorre
//               </h2>
//               <span className="text-sm font-semibold mb-1">27/10/2015</span>
//               <div className="w-10 border-b-2 border-white mb-4"></div>
//               <p className="mb-4 text-sm leading-relaxed">
//                 Re-impermeabilização completa <br />
//                 da laje térrea com aplicação de <br />
//                 manta asfáltica de alta performance, <br />
//                 garantindo a proteção e a <br />
//                 durabilidade do empreendimento.
//               </p>
//               <button className="bg-lime-400 text-[#002F6C] px-4 py-2 rounded-full text-sm font-semibold w-fit">
//                 Veja mais
//               </button>
//             </div>
//           </div>
          
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ObrasRealizadas() {
  return (
    <div className="flex flex-col min-h-screen bg-[#002F6C] text-white">
      <Header transparent={true} />

      <main className="flex flex-col items-center px-4 pb-16 pt-32">
        <div className="w-full max-w-5xl flex flex-col gap-16">
          <h1 className="text-4xl font-bold text-lime-400">Obras realizadas</h1>

          {/* Blocos de obras */}
          {[
            {
              title: "Condomínio Quinta da Baroneza",
              date: "27/10/2015",
              image: "https://placehold.co/600x300",
              text: `Executamos a reforma completa da
              impermeabilização do tanque principal
              da Estação de Tratamento de Esgoto,
              garantindo máxima eficiência e
              durabilidade para as operações do condomínio.`,
              reverse: false,
            },
            {
              title: "Residencial Giverny",
              date: "27/10/2015",
              image: "https://placehold.co/600x300",
              text: `Realizamos a impermeabilização integral
              do empreendimento, desde a fundação
              até a cobertura, utilizando técnicas
              avançadas que proporcionam segurança
              estrutural e valorização do projeto.`,
              reverse: true,
            },
            {
              title: "Residencial Cartagena e Medellin",
              date: "27/10/2015",
              image: "https://placehold.co/600x300",
              text: `Executamos a reforma completa da
              impermeabilização do tanque principal
              da Estação de Tratamento de Esgoto,
              garantindo máxima eficiência e
              durabilidade para as operações do condomínio.`,
              reverse: false,
            },
            {
              title: "Residência de Maria Louise ",
              date: "27/10/2015",
              image: "https://placehold.co/600x300",
              text: `Re-impermeabilização completa
              da laje térrea com aplicação de
              manta asfáltica de alta performance,
              garantindo a proteção e a
              durabilidade do empreendimento.`,
              reverse: true,
            },
          ].map(({ title, date, image, text, reverse }, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center md:items-start gap-12 ${
                reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Imagem mobile */}
              <img
                src={"https://placehold.co/150x75"}
                alt={title}
                className="block md:hidden w-full h-auto rounded rounded-sm"
              />
              {/* Imagem desktop */}
              <img
                src={image}
                alt={title}
                className="hidden md:block w-full md:w-auto h-auto rounded rounded-sm"
              />

              {/* Conteúdo */}
              <div className="w-full md:w-1/2 flex flex-col">
              
                <h2 className="text-lime-400 font-semibold mb-2 break-words whitespace-pre-line">{title}</h2>
                <span className="text-sm font-semibold mb-1">{date}</span>
                <div className="w-10 border-b-2 border-white mb-4"></div>
                {/* <p className="mb-4 text-sm leading-relaxed whitespace-pre-line"> */}
                <p className="mb-4 text-sm leading-relaxed break-words whitespace-pre-line">
                  {text}
                </p>
                <button className="bg-lime-400 text-[#002F6C] px-4 py-2 rounded-full text-sm font-semibold w-fit">
                  Veja mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
