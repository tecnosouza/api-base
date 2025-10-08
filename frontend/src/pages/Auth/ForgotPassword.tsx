import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{
      backgroundImage: `url('/backgroud-forgot-password.jpg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <div className="w-full max-w-md p-8 border rounded-lg shadow-md bg-secondary">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Recuperar Senha</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Informe seu e-mail e enviaremos instruções para redefinir sua senha.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              placeholder="seu@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            Enviar Instruções
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            <Link to="/" className="text-blue-600 hover:underline">
              Voltar para o login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
