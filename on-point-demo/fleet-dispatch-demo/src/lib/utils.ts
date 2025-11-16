import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GEL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('GEL', '₾');
}

export function formatDistance(km: number): string {
  return `${km.toLocaleString()} km`;
}

export function formatWeight(kg: number): string {
  return `${kg.toLocaleString()} kg`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function getAIScoreColor(score: number): string {
  if (score >= 90) return 'text-green-500';
  if (score >= 80) return 'text-blue-500';
  if (score >= 70) return 'text-yellow-500';
  return 'text-gray-500';
}

export function getAIScoreBgColor(score: number): string {
  if (score >= 90) return 'bg-green-500/10 border-green-500/20';
  if (score >= 80) return 'bg-blue-500/10 border-blue-500/20';
  if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/20';
  return 'bg-gray-500/10 border-gray-500/20';
}

export function getAIScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent Match';
  if (score >= 80) return 'Good Match';
  if (score >= 70) return 'Fair Match';
  return 'Available';
}
