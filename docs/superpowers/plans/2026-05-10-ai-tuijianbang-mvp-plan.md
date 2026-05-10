# AI推荐帮 MVP 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现AI推荐帮MVP，从项目初始化到完整的品牌检测闭环

**Architecture:** Next.js 14 App Router架构，分为前端（React组件）和后端（API Routes），数据存储使用Supabase PostgreSQL。MVP阶段采用简化版Query生成和手动检测结果录入流程。

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase, Vercel

---

## 文件结构

```
├── src/
│   ├── app/
│   │   ├── page.tsx              # 落地页
│   │   ├── layout.tsx             # 根布局
│   │   ├── globals.css           # 全局样式
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/             # 认证API
│   │   │   │   ├── register/route.ts
│   │   │   │   └── login/route.ts
│   │   │   ├── brands/            # 品牌API
│   │   │   │   ├── route.ts       # GET/POST /api/brands
│   │   │   │   └── [id]/route.ts # GET/PUT/DELETE /api/brands/:id
│   │   │   ├── queries/          # Query API
│   │   │   │   ├── generate/route.ts
│   │   │   │   └── route.ts
│   │   │   ├── detect/           # 检测API
│   │   │   │   ├── execute/route.ts
│   │   │   │   └── route.ts
│   │   │   ├── reports/          # 报告API
│   │   │   │   ├── route.ts
│   │   │   │   └── generate/route.ts
│   │   │   └── subscription/      # 订阅API
│   │   │       └── route.ts
│   │   ├── dashboard/            # 用户仪表盘
│   │   │   └── page.tsx
│   │   ├── brand/
│   │   │   ├── new/page.tsx      # 新建品牌
│   │   │   ├── [id]/page.tsx     # 品牌详情
│   │   │   ├── [id]/queries/page.tsx
│   │   │   ├── [id]/detect/page.tsx
│   │   │   └── [id]/report/page.tsx
│   │   ├── login/page.tsx
│   │   ├── pricing/page.tsx
│   │   └── profile/page.tsx
│   ├── components/
│   │   ├── ui/                   # 基础UI组件
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Header.tsx
│   │   ├── form/                 # 表单组件
│   │   │   └── BrandForm.tsx
│   │   ├── report/               # 报告组件
│   │   │   ├── ReportCard.tsx
│   │   │   └── ScoreChart.tsx
│   │   └── layout/
│   │       └── DashboardLayout.tsx
│   ├── lib/
│   │   ├── supabase.ts           # Supabase客户端
│   │   ├── queries.ts            # Query生成逻辑
│   │   └── utils.ts              # 工具函数
│   └── types/
│       └── index.ts              # TypeScript类型
├── public/
├── docs/
├── SPEC.md
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## 任务分解

### Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "ai-tuijianbang",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/ssr": "^0.1.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.0"
  }
}
```

- [ ] **Step 2: 创建配置文件**

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
```

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
export default config
```

**postcss.config.js:**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: 创建全局样式**

**src/app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}
```

**src/app/layout.tsx:**
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI推荐帮 - 您的品牌被AI推荐了吗',
  description: '帮助中小微企业的品牌被AI看见、被AI理解、被AI推荐',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: 安装依赖**

Run: `npm install`
Expected: 安装完成

- [ ] **Step 5: 初始化Git并提交**

Run: `git init && git add . && git commit -m "chore: 初始化项目结构"`

---

### Task 2: 基础UI组件

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Header.tsx`
- Create: `src/lib/utils.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: 创建工具函数**

**src/lib/utils.ts:**
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}

export function calculateScore(recommended: number, total: number) {
  if (total === 0) return 0
  return Math.round((recommended / total) * 100)
}
```

- [ ] **Step 2: 创建Button组件**

**src/components/ui/Button.tsx:**
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-slate-900 text-white hover:bg-slate-800': variant === 'primary',
            'bg-slate-100 text-slate-900 hover:bg-slate-200': variant === 'secondary',
            'border border-slate-200 hover:bg-slate-100': variant === 'outline',
            'hover:bg-slate-100': variant === 'ghost',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
```

- [ ] **Step 3: 创建Input组件**

**src/components/ui/Input.tsx:**
```typescript
import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
```

- [ ] **Step 4: 创建Card组件**

**src/components/ui/Card.tsx:**
```typescript
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-slate-200 bg-white shadow-sm',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
      />
    )
  }
)
CardHeader.displayName = 'CardHeader'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  }
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
      />
    )
  }
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }
```

- [ ] **Step 5: 创建Header组件**

**src/components/ui/Header.tsx:**
```typescript
import Link from 'next/link'
import { Button } from './Button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">AI推荐帮</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            价格
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              登录
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm">开始检测</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 6: 提交**

Run: `git add src/components src/lib && git commit -m "feat: 添加基础UI组件"`

---

### Task 3: 落地页

**Files:**
- Create: `src/components/ui/Footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 创建Footer组件**

**src/components/ui/Footer.tsx:**
```typescript
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-600">
            © 2026 AI推荐帮. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900">
              隐私政策
            </Link>
            <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">
              服务条款
            </Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: 创建落地页**

**src/app/page.tsx:**
```typescript
import Link from 'next/link'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-24 text-center">
          <div className="container px-4">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              您的品牌，<span className="text-primary-600">被AI推荐</span>了吗？
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
              帮助中小微企业了解自己的品牌在AI搜索中的可见性，
              获取专业的优化建议，让您的品牌被AI推荐。
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/login">
                <Button size="lg">开始免费检测</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  查看价格
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              为什么选择AI推荐帮？
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-4xl">🔍</div>
                  <h3 className="mb-2 text-xl font-semibold">AI可见性检测</h3>
                  <p className="text-slate-600">
                    输入品牌信息，我们帮您检测在各大AI平台（豆包、千问、DeepSeek、秘塔）的推荐情况。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-4xl">📊</div>
                  <h3 className="mb-2 text-xl font-semibold">诊断报告</h3>
                  <p className="text-slate-600">
                    详细的可见性报告，告诉您哪些问题被AI推荐，原因是什么。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 text-4xl">💡</div>
                  <h3 className="mb-2 text-xl font-semibold">优化建议</h3>
                  <p className="text-slate-600">
                    基于检测结果，给出具体的优化建议，帮助您补齐"事实资产"。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">使用流程</h2>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-600">
                  1
                </div>
                <h3 className="mb-2 font-semibold">填写品牌信息</h3>
                <p className="text-sm text-slate-600">输入品牌名称、行业、产品等基本信息</p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-600">
                  2
                </div>
                <h3 className="mb-2 font-semibold">AI检测</h3>
                <p className="text-sm text-slate-600">我们自动在AI平台搜索您的品牌相关问题</p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-600">
                  3
                </div>
                <h3 className="mb-2 font-semibold">查看报告</h3>
                <p className="text-sm text-slate-600">获取详细的可见性报告和优化建议</p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-600">
                  4
                </div>
                <h3 className="mb-2 font-semibold">持续优化</h3>
                <p className="text-sm text-slate-600">订阅后可持续监测并获取优化建议</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">准备好让您的品牌被AI推荐了吗？</h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-100">
              立即开始免费检测，了解您的品牌在AI搜索中的现状。
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                开始免费检测
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: 提交**

Run: `git add src/app/page.tsx src/components/ui/Footer.tsx && git commit -m "feat: 添加落地页"`

---

### Task 4: 类型定义和Supabase客户端

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/supabase.ts`
- Create: `.env.local.example`

- [ ] **Step 1: 创建类型定义**

**src/types/index.ts:**
```typescript
export interface User {
  id: string
  email: string
  name: string
  created_at: string
  subscription: 'free' | 'pro' | 'year'
  expires_at: string | null
}

export interface Brand {
  id: string
  user_id: string
  name: string
  industry: string
  product: string
  city: string
  competitors: string[]
  price_range: string
  highlights: string
  created_at: string
}

export interface Query {
  id: string
  brand_id: string
  query_text: string
  query_type: 'generic' | 'industry' | 'custom' | 'longtail'
  search_intent: string
  created_at: string
}

export interface DetectionResult {
  id: string
  query_id: string
  brand_id: string
  platform: 'doubao' | 'qianwen' | 'deepseek' | 'metaso'
  is_recommended: boolean
  sentiment: 'positive' | 'neutral' | 'negative'
  ai_content: string
  checked_at: string
}

export interface Report {
  id: string
  brand_id: string
  visible_score: number
  recommended_count: number
  competitor_count: number
  issues: Issue[]
  suggestions: Suggestion[]
  created_at: string
}

export interface Issue {
  id: string
  type: 'missing' | 'incorrect' | 'incomplete'
  description: string
  priority: 'high' | 'medium' | 'low'
}

export interface Suggestion {
  id: string
  type: 'content' | 'structural' | 'platform'
  description: string
  priority: 'high' | 'medium' | 'low'
}
```

- [ ] **Step 2: 创建Supabase客户端**

**src/lib/supabase.ts:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

- [ ] **Step 3: 创建环境变量示例**

**.env.local.example:**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (可选，用于Query生成)
OPENAI_API_KEY=your_openai_api_key
```

- [ ] **Step 4: 提交**

Run: `git add src/types src/lib .env.local.example && git commit -m "feat: 添加类型定义和Supabase客户端"`

---

### Task 5: 认证系统

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/app/api/auth/register/route.ts`
- Create: `src/app/api/auth/login/route.ts`
- Create: `src/app/api/auth/logout/route.ts`

- [ ] **Step 1: 创建登录页**

**src/app/login/page.tsx:**
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || '请求失败')
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : '请求失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center py-12">
        <div className="container px-4">
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>{isLogin ? '登录' : '注册'}</CardTitle>
              <CardDescription>
                {isLogin ? '登录您的账户' : '创建新账户'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <Input
                    label="用户名"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入用户名"
                    required
                  />
                )}
                <Input
                  label="邮箱"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
                <Input
                  label="密码"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? '处理中...' : isLogin ? '登录' : '注册'}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                {isLogin ? '没有账户？' : '已有账户？'}
                <button
                  type="button"
                  className="ml-1 text-primary-600 hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? '注册' : '登录'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: 创建注册API**

**src/app/api/auth/register/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码是必填项' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0],
        },
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      user: data.user,
      message: '注册成功',
    })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 3: 创建登录API**

**src/app/api/auth/login/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码是必填项' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json({
      user: data.user,
      message: '���录���功',
    })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 4: 创建登出API**

**src/app/api/auth/logout/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: '登出成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 5: 提交**

Run: `git add src/app/login src/app/api/auth && git commit -m "feat: 添加认证系统"`

---

### Task 6: 品牌管理

**Files:**
- Create: `src/app/api/brands/route.ts`
- Create: `src/app/api/brands/[id]/route.ts`
- Create: `src/app/brand/new/page.tsx`
- Create: `src/app/brand/[id]/page.tsx`
- Modify: `src/components/ui/Header.tsx`

- [ ] **Step 1: 创建品牌API（列表）**

**src/app/api/brands/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ brands: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const body = await request.json()
    const { name, industry, product, city, competitors, price_range, highlights } = body

    if (!name || !industry || !product || !city) {
      return NextResponse.json(
        { error: '请填写必填项' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('brands')
      .insert({
        user_id: user.id,
        name,
        industry,
        product,
        city,
        competitors: competitors || [],
        price_range: price_range || '',
        highlights: highlights || '',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ brand: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: 创建品牌详情API**

**src/app/api/brands/[id]/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      return NextResponse.json({ error: '品牌不存在' }, { status: 404 })
    }

    return NextResponse.json({ brand: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const body = await request.json()
    const { name, industry, product, city, competitors, price_range, highlights } = body

    const { data, error } = await supabase
      .from('brands')
      .update({
        name,
        industry,
        product,
        city,
        competitors,
        price_range,
        highlights,
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ brand: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: '删除成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 3: 创建辅助函数**

**src/lib/auth.ts:**
```typescript
import { NextRequest } from 'next/server'
import { supabase } from './supabase'

export async function getUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return null

  const token = authHeader.replace('Bearer ', '')
  
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) return null
  
  return user
}
```

- [ ] **Step 4: 创建新建品牌页**

**src/app/brand/new/page.tsx:**
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const industries = [
  '餐饮/美食',
  '零售/电商',
  '本地服务',
  '教育培训',
  'B2B软件',
  '医疗健康',
  '美业',
  '家政',
  '装修',
  '其他',
]

export default function NewBrandPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    product: '',
    city: '',
    competitors: '',
    price_range: '',
    highlights: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          competitors: formData.competitors.split(',').map((c) => c.trim()).filter(Boolean),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || '创建失败')
      }

      router.push(`/brand/${data.brand.id}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : '创建失败')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>添加品牌</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="品牌名称 *"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="请输入品牌名称"
                required
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  行业 *
                </label>
                <select
                  className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={formData.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  required
                >
                  <option value="">请选择行业</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="产品/服务 *"
                value={formData.product}
                onChange={(e) => updateField('product', e.target.value)}
                placeholder="请描述您的产品或服务"
                required
              />

              <Input
                label="目标城市 *"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="如：北京、上海、杭州"
                required
              />

              <Input
                label="主要竞品"
                value={formData.competitors}
                onChange={(e) => updateField('competitors', e.target.value)}
                placeholder="用逗号分隔，如：竞品A, 竞品B"
              />

              <Input
                label="价格带"
                value={formData.price_range}
                onChange={(e) => updateField('price_range', e.target.value)}
                placeholder="如：500-1000元"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  核心卖点
                </label>
                <textarea
                  className="flex min-h-[100px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={formData.highlights}
                  onChange={(e) => updateField('highlights', e.target.value)}
                  placeholder="请描述您的核心优势"
                />
              </div>

              <div className="flex gap-4">
                <Link href="/dashboard">
                  <Button type="button" variant="outline">
                    取消
                  </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  {loading ? '创建中...' : '创建品牌'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
```

- [ ] **Step 5: 创建品牌详情页**

**src/app/brand/[id]/page.tsx:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import type { Brand } from '@/types'

interface BrandDetailPageProps {
  params: { id: string }
}

export default function BrandDetailPage({ params }: BrandDetailPageProps) {
  const router = useRouter()
  const [brand, setBrand] = useState<Brand | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/brands/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.brand) {
          setBrand(data.brand)
        }
      })
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-slate-600">加载中...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!brand) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="mb-4 text-slate-600">品牌不存在</p>
          <Link href="/dashboard">
            <Button>返回仪表盘</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{brand.name}</h1>
            <p className="text-slate-600">
              {brand.industry} · {brand.city}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/brand/${brand.id}/queries`}>
              <Button variant="outline">查看Query</Button>
            </Link>
            <Link href={`/brand/${brand.id}/detect`}>
              <Button>开始检测</Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>品牌信息</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-slate-500">行业</dt>
                <dd>{brand.industry}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">产品/服务</dt>
                <dd>{brand.product}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">目标城市</dt>
                <dd>{brand.city}</dd>
              </div>
              {brand.price_range && (
                <div>
                  <dt className="text-sm font-medium text-slate-500">价格带</dt>
                  <dd>{brand.price_range}</dd>
                </div>
              )}
              {brand.highlights && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-slate-500">核心卖点</dt>
                  <dd>{brand.highlights}</dd>
                </div>
              )}
              {brand.competitors && brand.competitors.length > 0 && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-slate-500">竞品</dt>
                  <dd>{brand.competitors.join(', ')}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
```

- [ ] **Step 6: 创建DashboardLayout**

**src/components/layout/DashboardLayout.tsx:**
```typescript
import Link from 'next/link'
import { Header } from '@/components/ui/Header'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
```

- [ ] **Step 7: 提交**

Run: `git add src/app/api/brands src/app/brand src/components/layout src/lib/auth.ts && git commit -m "feat: 添加品牌管理功能"`

---

### Task 7: Query生成

**Files:**
- Create: `src/lib/queries.ts`
- Create: `src/app/api/queries/route.ts`
- Create: `src/app/api/queries/generate/route.ts`
- Create: `src/app/brand/[id]/queries/page.tsx`

- [ ] **Step 1: 创建Query生成逻辑**

**src/lib/queries.ts:**
```typescript
import type { Brand } from '@/types'

// 第一层：通用品牌问题
export const genericQueries = [
  '{brand}靠谱吗',
  '{brand}怎么样',
  '{brand}值得买吗',
  '{brand}和竞品哪个好',
  '{brand}多少钱',
  '{brand}有没有坑',
  '{brand}适合什么人',
  '{brand}售后怎么样',
  '{brand}附近有没有门店',
  '{brand}排名前十有哪些',
  '{brand}口碑怎么样',
  '{brand}服务质量如何',
  '{brand}怎么预约',
  '{brand}联系方式',
  '{brand}地址在哪',
  '{brand}营��时间',
  '{brand}优惠活动',
  '{brand}用户评价',
  '{brand}真实体验',
  '{brand}靠谱不',
  '{brand}到底好不好',
]

// 第二层：行业问题模板（示例）
export const industryQueries: Record<string, string[]> = {
  '餐饮/美食': [
    '{brand}好吃吗',
    '{brand}菜单',
    '{brand}人均消费',
    '{brand}地址',
    '{brand}营业时间',
    '{brand}订座',
    '{brand}外卖',
    '{brand}招牌菜',
    '{brand}环境',
    '{brand}停车',
  ],
  '零售/电商': [
    '{brand}正品吗',
    '{brand}旗舰店',
    '{brand}发货时间',
    '{brand}退换货',
    '{brand}优惠码',
    '{brand}会员',
    '{brand}折扣',
    '{brand}库存',
    '{brand}真假',
    '{brand}618活动',
  ],
  '本地服务': [
    '{brand}怎么预约',
    '{brand}收费标准',
    '{brand}服务范围',
    '{brand}电话',
    '{brand}上门服务',
    '{brand}师傅专业吗',
    '{brand}口碑',
    '{brand}评价',
    '{brand}售后',
    '{brand}保修',
    '{brand}联系方式',
  ],
  '教育培训': [
    '{brand}课程有用吗',
    '{brand}学费',
    '{brand}校区',
    '{brand}师资',
    '{brand}就业',
    '{brand}证书',
    '{brand}试听',
    '{brand}口碑',
    '{brand}通过率',
    '{brand}报名',
    '{brand}怎么样',
  ],
  'B2B软件': [
    '{brand}价格',
    '{brand}功能',
    '{brand}私有化部署',
    '{brand}vs竞品',
    '{brand}免费版',
    '{brand}企业版',
    '{brand}API',
    '{brand}集成',
    '{brand}案例',
    '{brand}试用',
  ],
  // 其他行业默认问题
  default: [
    '{brand}怎么样',
    '{brand}服务',
    '{brand}产品',
    '{brand}价格',
    '{brand}口碑',
    '{brand}联系',
    '{brand}怎么样',
    '{brand}评价',
    '{brand}推荐',
    '{brand}选择',
  ],
}

// 获取行业问题
export function getIndustryQueries(industry: string): string[] {
  return industryQueries[industry] || industryQueries.default
}

// 生成品牌定制问题
export function generateCustomQueries(brand: Brand): string[] {
  const queries = []
  const { name, product, city, competitors, highlights, price_range } = brand

  // 基于产品的Query
  queries.push(
    `${product}哪家好`,
    `${product}多少钱`,
    `${product}怎么选`,
    `${product}推荐`,
    `${product}品牌`,
  )

  // 基于城市的Query
  if (city) {
    queries.push(
      `${city}哪家${product}好`,
      `${city}${product}推荐`,
      `${city}${name}怎么样`,
      `${city}${product}公司`,
    )
  }

  // 基于竞品的Query
  if (competitors && competitors.length > 0) {
    competitors.forEach((comp) => {
      queries.push(`${name}和${comp}哪个好`)
      queries.push(`${comp}怎么样`)
    })
  }

  return queries.slice(0, 30)
}

// 主生成函数
export function generateAllQueries(brand: Brand): string[] {
  const queries: string[] = []

  // 第一层：20个通用问题
  genericQueries.forEach((q) => {
    queries.push(q.replace('{brand}', brand.name))
  })
  
  // 第二层：30个行业问题
  const indQueries = getIndustryQueries(brand.industry)
  indQueries.slice(0, 30).forEach((q) => {
    queries.push(q.replace('{brand}', brand.name))
  })

  // 第三层：30个企业定制问题
  const customQueries = generateCustomQueries(brand)
  customQueries.slice(0, 30).forEach((q) => {
    queries.push(q)
  })

  // 第四层：20个长尾问题（简化版）
  queries.push(
    `${brand.name}真实评价`,
    `${brand.name}避坑指南`,
    `${brand.name}选购指南`,
  )

  return [...new Set(queries)].slice(0, 100)
}
```

- [ ] **Step 2: 创建Query API**

**src/app/api/queries/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { brandId: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .eq('brand_id', params.brandId)
      .order('created_at', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ queries: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 3: 创建Query生成API**

**src/app/api/queries/generate/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'
import { generateAllQueries } from '@/lib/queries'

export async function POST(
  request: NextRequest,
  { params }: { params: { brandId: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 获取品牌信息
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .eq('id', params.brandId)
      .eq('user_id', user.id)
      .single()

    if (brandError || !brand) {
      return NextResponse.json({ error: '品牌不存在' }, { status: 404 })
    }

    // 生成Query
    const queryTexts = generateAllQueries(brand)

    // 确定类型
    const queryTypes = [
      ...Array(20).fill('generic'),
      ...Array(30).fill('industry'),
      ...Array(30).fill('custom'),
      ...Array(20).fill('longtail'),
    ]

    // 插入数据库
    const queries = queryTexts.map((text, i) => ({
      brand_id: params.brandId,
      query_text: text,
      query_type: queryTypes[i] || 'longtail',
      search_intent: '',
    }))

    const { data, error } = await supabase.from('queries').insert(queries).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ queries: data, count: data?.length || 0 })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 4: 创建Query列表页**

**src/app/brand/[id]/queries/page.tsx:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { Query } from '@/types'

interface QueriesPageProps {
  params: { id: string }
}

export default function QueriesPage({ params }: QueriesPageProps) {
  const [queries, setQueries] = useState<Query[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetch(`/api/queries/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.queries) setQueries(data.queries)
      })
      .finally(() => setLoading(false))
  }, [params.id])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await fetch(`/api/queries/generate/${params.id}`, { method: 'POST' })
      const data = await res.json()
      if (data.queries) {
        setQueries(data.queries)
      }
    } finally {
      setGenerating(false)
    }
  }

  const groupedQueries = queries.reduce((acc, q) => {
    const type = q.query_type
    if (!acc[type]) acc[type] = []
    acc[type].push(q)
    return acc
  }, {} as Record<string, Query[]>)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">监测问题</h1>
            <p className="text-slate-600">共 {queries.length} 个问题</p>
          </div>
          <Button onClick={handleGenerate} disabled={generating}>
            {generating ? '生成中...' : '生成Query'}
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-slate-600">加载中...</p>
        ) : queries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-slate-600">还没有生成监测问题</p>
              <Button onClick={handleGenerate} disabled={generating}>
                {generating ? '生成中...' : '点击生成100个问题'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {groupedQueries.generic && (
              <Card>
                <CardHeader>
                  <CardTitle>通用品牌问题 ({groupedQueries.generic.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {groupedQueries.generic.map((q) => (
                      <li key={q.id} className="text-sm">
                        {q.query_text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {groupedQueries.industry && (
              <Card>
                <CardHeader>
                  <CardTitle>行业问题 ({groupedQueries.industry.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {groupedQueries.industry.map((q) => (
                      <li key={q.id} className="text-sm">
                        {q.query_text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {groupedQueries.custom && (
              <Card>
                <CardHeader>
                  <CardTitle>企业定制问题 ({groupedQueries.custom.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {groupedQueries.custom.map((q) => (
                      <li key={q.id} className="text-sm">
                        {q.query_text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <div className="flex justify-between">
          <Link href={`/brand/${params.id}`}>
            <Button variant="outline">返回品牌详情</Button>
          </Link>
          <Link href={`/brand/${params.id}/detect`}>
            <Button>开始检测</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
```

- [ ] **Step 5: 提交**

Run: `git add src/lib/queries.ts src/app/api/queries src/app/brand/\[id\]/queries && git commit -m "feat: 添加Query生成功能"`

---

### Task 8: 检测和报告

**Files:**
- Create: `src/app/api/detect/route.ts`
- Create: `src/app/api/detect/execute/route.ts`
- Create: `src/app/api/reports/route.ts`
- Create: `src/app/api/reports/generate/route.ts`
- Create: `src/app/brand/[id]/detect/page.tsx`
- Create: `src/app/brand/[id]/report/page.tsx`

- [ ] **Step 1: 创建检测结果API**

**src/app/api/detect/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { brandId: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('detection_results')
      .select('*')
      .eq('brand_id', params.brandId)
      .order('checked_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ results: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // 预留：批量导入检测结果
}
```

- [ ] **Step 2: 创建检测执行API**

**src/app/api/detect/execute/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { brandId: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const body = await request.json()
    const { queryId, platform, isRecommended, sentiment, aiContent } = body

    if (!queryId || !platform) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('detection_results')
      .insert({
        query_id: queryId,
        brand_id: params.brandId,
        platform,
        is_recommended: isRecommended || false,
        sentiment: sentiment || 'neutral',
        ai_content: aiContent || '',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ result: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 3: 创建报告API**

**src/app/api/reports/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { brandId: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('brand_id', params.brandId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      return NextResponse.json({ error: '暂无报告' }, { status: 404 })
    }

    return NextResponse.json({ report: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 4: 创建报告生成API**

**src/app/api/reports/generate/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/auth'
import { calculateScore } from '@/lib/utils'

export async function POST(
  request: NextRequest,
  { params }: { params: { brandId: string } }
) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 获取检测结果
    const { data: results, error: resultsError } = await supabase
      .from('detection_results')
      .select('*')
      .eq('brand_id', params.brandId)

    if (resultsError) {
      return NextResponse.json({ error: resultsError.message }, { status: 400 })
    }

    // 计算统计数据
    const total = results?.length || 0
    const recommended = results?.filter((r) => r.is_recommended).length || 0
    const score = calculateScore(recommended, total)

    // 生成问题清单（简化版）
    const issues = []
    if (recommended === 0) {
      issues.push({
        id: '1',
        type: 'missing' as const,
        description: '您的品牌在AI搜索中没有被推荐，建议优化品牌信息',
        priority: 'high' as const,
      })
    }
    if (total < 50) {
      issues.push({
        id: '2',
        type: 'incomplete' as const,
        description: '检测的问题数量不足，建议补充更多问题进行检测',
        priority: 'medium' as const,
      })
    }

    // 生成建议（简化版）
    const suggestions = [
      {
        id: '1',
        type: 'content' as const,
        description: '在官网添加FAQ页面，回答用户常见问题',
        priority: 'high' as const,
      },
      {
        id: '2',
        type: 'platform' as const,
        description: '在大众点评、小红书等平台完善品牌信息',
        priority: 'medium' as const,
      },
      {
        id: '3',
        type: 'structural' as const,
        description: '使用结构化数据标记品牌信息',
        priority: 'low' as const,
      },
    ]

    // 创建报告
    const { data, error } = await supabase
      .from('reports')
      .insert({
        brand_id: params.brandId,
        visible_score: score,
        recommended_count: recommended,
        competitor_count: 0, // 简化版
        issues,
        suggestions,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ report: data })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 5: 创建检测页面**

**src/app/brand/[id]/detect/page.tsx:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { Query, DetectionResult } from '@/types'

interface DetectPageProps {
  params: { id: string }
}

const platforms = [
  { id: 'doubao', name: '豆包' },
  { id: 'qianwen', name: '千问' },
  { id: 'deepseek', name: 'DeepSeek' },
  { id: 'metaso', name: '秘塔' },
]

export default function DetectPage({ params }: DetectPageProps) {
  const [queries, setQueries] = useState<Query[]>([])
  const [results, setResults] = useState<DetectionResult[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPlatform, setCurrentPlatform] = useState('doubao')

  useEffect(() => {
    Promise.all([
      fetch(`/api/queries/${params.id}`).then((r) => r.json()),
      fetch(`/api/detect/${params.id}`).then((r) => r.json()),
    ]).then(([qData, rData]) => {
      if (qData.queries) setQueries(qData.queries)
      if (rData.results) setResults(rData.results)
    }).finally(() => setLoading(false))
  }, [params.id])

  const handleRecord = async (query: Query) => {
    const result = prompt(`查询: ${query.query_text}\n\n您的品牌被推荐了吗？(yes/no)`)
    const isRecommended = result?.toLowerCase() === 'yes'

    await fetch('/api/detect/execute/' + params.id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        queryId: query.id,
        platform: currentPlatform,
        isRecommended,
        sentiment: isRecommended ? 'positive' : 'neutral',
      }),
    })

    // 刷新结果
    const rData = await fetch(`/api/detect/${params.id}`).then((r) => r.json())
    if (rData.results) setResults(rData.results)
  }

  const getRecommendationStatus = (queryId: string) => {
    return results.find(
      (r) => r.query_id === queryId && r.platform === currentPlatform
    )
  }

  const total = results.filter((r) => r.platform === currentPlatform).length
  const recommended = results.filter(
    (r) => r.platform === currentPlatform && r.is_recommended
  ).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI检测</h1>
            <p className="text-slate-600">
              在 {platforms.find((p) => p.id === currentPlatform)?.name} 检测您的品牌
            </p>
          </div>
          <div className="flex gap-2">
            {platforms.map((p) => (
              <Button
                key={p.id}
                variant={currentPlatform === p.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCurrentPlatform(p.id)}
              >
                {p.name}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              检测进度: {recommended}/{total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-primary-600"
                style={{ width: `${total > 0 ? (recommended / total) * 100 : 0}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <p className="text-center text-slate-600">加载中...</p>
        ) : queries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-slate-600">请先生成Query</p>
              <Link href={`/brand/${params.id}/queries`}>
                <Button>去生成Query</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {queries.slice(0, 10).map((query) => {
              const status = getRecommendationStatus(query.id)
              return (
                <div
                  key={query.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium">{query.query_text}</p>
                    {status && (
                      <p
                        className={`text-sm ${
                          status.is_recommended
                            ? 'text-green-600'
                            : 'text-slate-500'
                        }`}
                      >
                        {status.is_recommended ? '✓ 已推荐' : '✗ 未推荐'}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={status ? 'outline' : 'primary'}
                    onClick={() => handleRecord(query)}
                  >
                    {status ? '修改' : '记录'}
                  </Button>
                </div>
              )
            })}
            {queries.length > 10 && (
              <p className="text-center text-slate-500">
                还有 {queries.length - 10} 个问题...
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <Link href={`/brand/${params.id}/queries`}>
            <Button variant="outline">返回Query</Button>
          </Link>
          <Link href={`/brand/${params.id}/report`}>
            <Button>查看报告</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
```

- [ ] **Step 6: 创建报告页面**

**src/app/brand/[id]/report/page.tsx:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import type { Report } from '@/types'

interface ReportPageProps {
  params: { id: string }
}

export default function ReportPage({ params }: ReportPageProps) {
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetch(`/api/reports/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.report) setReport(data.report)
      })
      .finally(() => setLoading(false))
  }, [params.id])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/reports/generate/' + params.id, {
        method: 'POST',
      })
      const data = await res.json()
      if (data.report) setReport(data.report)
    } finally {
      setGenerating(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">检测报告</h1>
          <Button onClick={handleGenerate} disabled={generating}>
            {generating ? '生成中...' : '生成报告'}
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-slate-600">加载中...</p>
        ) : !report ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-slate-600">请先完成���测</p>
              <Link href={`/brand/${params.id}/detect`}>
                <Button>去检测</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>可见性分数</CardTitle>
                <CardDescription>
                  基于 {report.recommended_count} 次检测结果
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className={`text-6xl font-bold ${getScoreColor(report.visible_score)}`}>
                    {report.visible_score}
                  </p>
                  <p className="text-slate-500">分</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>问题诊断</CardTitle>
              </CardHeader>
              <CardContent>
                {report.issues && report.issues.length > 0 ? (
                  <ul className="space-y-3">
                    {report.issues.map((issue) => (
                      <li key={issue.id} className="flex items-start gap-2">
                        <span
                          className={`mt-1 rounded px-1 py-0.5 text-xs ${
                            issue.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : issue.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {issue.priority}
                        </span>
                        <span>{issue.description}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">暂无问题</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>优化建议</CardTitle>
              </CardHeader>
              <CardContent>
                {report.suggestions && report.suggestions.length > 0 ? (
                  <ul className="space-y-3">
                    {report.suggestions.map((suggestion) => (
                      <li key={suggestion.id} className="flex items-start gap-2">
                        <span
                          className={`mt-1 rounded px-1 py-0.5 text-xs ${
                            suggestion.priority === 'high'
                              ? 'bg-blue-100 text-blue-700'
                              : suggestion.priority === 'medium'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {suggestion.type}
                        </span>
                        <span>{suggestion.description}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">暂无建议</p>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <div className="flex justify-between">
          <Link href={`/brand/${params.id}/detect`}>
            <Button variant="outline">返回检测</Button>
          </Link>
          <Link href={`/brand/${params.id}`}>
            <Button>返回品牌</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
```

- [ ] **Step 7: 提交**

Run: `git add src/app/api/detect src/app/api/reports src/app/brand/\[id\]/detect src/app/brand/\[id\]/report && git commit -m "feat: 添加检测和报告功能"`

---

### Task 9: 仪表盘和定价页

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/app/pricing/page.tsx`
- Create: `src/app/profile/page.tsx`

- [ ] **Step 1: 创建仪表盘**

**src/app/dashboard/page.tsx:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { Brand } from '@/types'

export default function DashboardPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/brands')
      .then((res) => res.json())
      .then((data) => {
        if (data.brands) setBrands(data.brands)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">我的品牌</h1>
            <p className="text-slate-600">管理您的品牌检测</p>
          </div>
          <Link href="/brand/new">
            <Button>添加品牌</Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-slate-600">加载中...</p>
        ) : brands.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-slate-600">还没有品牌</p>
              <Link href="/brand/new">
                <Button>添加第一个品牌</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {brands.map((brand) => (
              <Card key={brand.id}>
                <CardHeader>
                  <CardTitle>{brand.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">
                    {brand.industry} · {brand.city}
                  </p>
                  <p className="mt-2 text-sm">{brand.product}</p>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/brand/${brand.id}`}>
                      <Button variant="outline" size="sm">
                        查看
                      </Button>
                    </Link>
                    <Link href={`/brand/${brand.id}/detect`}>
                      <Button size="sm">检测</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
```

- [ ] **Step 2: 创建定价页**

**src/app/pricing/page.tsx:**
```typescript
import Link from 'next/link'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'

const plans = [
  {
    name: '免费版',
    price: '¥0',
    period: '永久',
    description: '适合体验功能',
    features: ['1次品牌检测', '基础报告', '100个Query'],
    button: '开始免费',
    href: '/login',
  },
  {
    name: '月付版',
    price: '¥29',
    period: '/月',
    description: '适合持续运营',
    features: [
      '无限次检测',
      '月度报告',
      '优化建议',
      '竞品对比',
      '优先支持',
    ],
    popular: true,
    button: '立即订阅',
    href: '/login',
  },
  {
    name: '年付版',
    price: '¥299',
    period: '/年',
    description: '适合企业客户',
    features: [
      '月付版全部',
      '定制报告',
      '优先处理',
      '专属客服',
      '批量品牌',
    ],
    button: '立即订阅',
    href: '/login',
  },
]

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-center text-3xl font-bold">
            选择您的套餐
          </h1>
          <p className="mb-12 text-center text-slate-600">
            根据您的需求选择合适的套餐
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.popular ? 'border-primary-600' : ''}>
                {plan.popular && (
                  <div className="rounded-t-lg bg-primary-600 px-4 py-1 text-center text-sm text-white">
                    最受欢迎
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-4xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-slate-500">
                      {plan.period}
                    </span>
                  </p>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href={plan.href}>
                    <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'}>
                      {plan.button}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: 创建个人中心**

**src/app/profile/page.tsx:**
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>个人中心</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-slate-600">
              管理您的账户设置
            </p>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={loading}
              className="w-full"
            >
              {loading ? '处理中...' : '退出登录'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
```

- [ ] **Step 4: 提交**

Run: `git add src/app/dashboard src/app/pricing src/app/profile && git commit -m "feat: 添加仪表盘和定价页"`

---

## 遗留事项

- [ ] 创建Supabase数据库表（brands, queries, detection_results, reports）
- [ ] 配置环境变量
- [ ] 部署到Vercel
- [ ] 种子用户测试

---

**Plan complete.**

保存路径：`/Users/xingzengji/Documents/Code/GEO/docs/superpowers/plans/2026-05-10-ai-tuijianbang-mvp-plan.md`

**两个执行选项：**

**1. Subagent-Driven (recommended)** - 每个task分配一个子任务，review后继续

**2. Inline Execution** - 当前会话批量执行，有review检查点

**请选择执行方式？**