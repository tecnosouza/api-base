import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Index from "./pages/Index";
import SobreNos from "./pages/SobreNos";
import Atuacao from "./pages/Atuacao";
import Impermeabilizacao from "./pages/Atuacao/impermeabilizacao";
import Categories from "./pages/categories";
import Products from "./pages/products";
import Users from "./pages/users";
import ObrasCivis from "./pages/Atuacao/ObrasCivis";
import Estruturas from "./pages/Atuacao/Estruturas";
import Portfolio from "./pages/Portfolio";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import Injecao from "./pages/Atuacao/Injecao";
import Produtos from "./pages/NossaLoja/Produtos";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sobre-nos" element={<SobreNos />} />
              <Route path="/atuacao" element={<Atuacao />} />
              <Route path="/atuacao/obras-civis" element={<ObrasCivis />} />
              <Route path="/atuacao/impermeabilizacao" element={<Impermeabilizacao />} />
              <Route path="/atuacao/reformas" element={<Atuacao />} />
              <Route path="/atuacao/estruturas" element={<Estruturas />} />
              <Route path="/atuacao/injecao" element={<Injecao />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/nossa-loja/produtos/:produto" element={<Produtos />} />
              <Route path="/contato" element={<Contato />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              {/* Rotas de usuário comum */}
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/users" element={<Users />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>

  </QueryClientProvider>
);

export default App;
