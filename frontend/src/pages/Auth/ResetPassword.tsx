
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 modern-card">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Redefinir Senha</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-foreground">
              Nova Senha
            </label>
            <input
              type="password"
              id="password"
              className="modern-input"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-foreground">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="modern-input"
            />
          </div>
          <button
            type="submit"
            className="modern-btn-primary w-full"
          >
            Redefinir Senha
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            <Link to="/" className="text-primary hover:underline">
              Voltar para o login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
