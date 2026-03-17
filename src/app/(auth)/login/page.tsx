'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { LoginSchema } from '@/schemas/auth.schema';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = LoginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    // Validation passed — redirect to dashboard
    router.push('/dashboard');
  }

  return (
    <div className="bg-bg-secondary border border-white/6 rounded-xl p-6 w-full">
      <form onSubmit={handleSubmit} noValidate>
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
          />

          {/* Password */}
          <div>
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={errors.password}
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
