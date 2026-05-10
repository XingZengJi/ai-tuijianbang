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