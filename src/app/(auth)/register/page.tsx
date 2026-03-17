import Link from 'next/link';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function RegisterPage() {
  return (
    <div className="bg-bg-secondary border border-white/6 rounded-xl p-6 w-full">
      <form>
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-accent-primary">
            ◆ Life Boost PRO
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Criar sua conta
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

        {/* Form Fields */}
        <div className="space-y-4">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome"
          />

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
          />

          <Input
            label="Confirmar Senha"
            type="password"
            placeholder="••••••••"
          />
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-2 mt-4 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-white/10 bg-bg-input accent-accent-primary"
          />
          <span className="text-xs text-text-secondary">
            Li e aceito os{' '}
            <Link href="#" className="text-accent-primary-light hover:underline">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link href="#" className="text-accent-primary-light hover:underline">
              Política de Privacidade
            </Link>
          </span>
        </label>

        {/* Register Button */}
        <div className="mt-6">
          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-text-secondary mt-6">
          Já tem conta?{' '}
          <Link
            href="/login"
            className="text-accent-primary-light hover:underline"
          >
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
