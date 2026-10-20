// Katta, oson bosiladigan tugmalar (kamida 64px @1080p)
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
export type ButtonSize = 'md' | 'lg' | 'xl';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:brightness-110 shadow-[0_0.3rem_0_rgb(0_0_0/0.18)]',
  accent: 'bg-accent text-ink hover:brightness-105 shadow-[0_0.3rem_0_rgb(0_0_0/0.15)]',
  secondary: 'bg-surface text-ink border-[0.15rem] border-line hover:border-primary',
  ghost: 'bg-transparent text-ink hover:bg-surface-2',
};

const SIZES: Record<ButtonSize, string> = {
  md: 'min-h-tap px-6 text-meta',
  lg: 'min-h-[5rem] px-8 text-body',
  xl: 'min-h-[7rem] px-10 text-lead',
};

export function bigButtonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'lg', extra = ''): string {
  return [
    'inline-flex items-center justify-center gap-3 rounded-xl2 font-extrabold select-none',
    'transition-[transform,filter] duration-150 active:translate-y-[0.15rem]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0',
    VARIANTS[variant],
    SIZES[size],
    extra,
  ].join(' ');
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize; children: ReactNode };

export function BigButton({ variant, size, className = '', type = 'button', ...rest }: BtnProps) {
  return <button type={type} className={bigButtonClass(variant, size, className)} {...rest} />;
}

type LinkBtnProps = LinkProps & { variant?: ButtonVariant; size?: ButtonSize };

export function BigLink({ variant, size, className = '', ...rest }: LinkBtnProps) {
  return <Link className={bigButtonClass(variant, size, className as string)} {...rest} />;
}
