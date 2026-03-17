import Link from 'next/link';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className="bg-bg-secondary border border-white/6 rounded-xl p-6 w-full">
      <form>
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-accent-primary">
            ◆ Life Boost PRO
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Entrar na sua conta
          </p>
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          className="w-full bg-white text-black rounded-lg h-12 flex items-center justify-center gap-3 font-medium text-sm hover:bg-white/90 transition-colors cursor-pointer"
        >
          <span className="text-lg font-bold">G</span>
          Continuar com Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-text-tertiary text-xs">ou</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Email */}
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
          />

          {/* Password */}
          <div>
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
            />
            <div className="flex justify-end mt-1.5">
              <Link
                href="#"
                className="text-xs text-accent-primary-light hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div className="mt-6">
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-text-secondary mt-6">
          Não tem conta?{' '}
          <Link
            href="/register"
            className="text-accent-primary-light hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}
