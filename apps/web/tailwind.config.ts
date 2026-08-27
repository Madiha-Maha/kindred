import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { terracotta: '#C1633D', cream: '#F7F1E6', forest: '#2F4131', gold: '#C9A45C' }, fontFamily: { serif: ['var(--font-fraunces)'], sans: ['var(--font-inter)'] } } }, plugins: [] };
export default config;