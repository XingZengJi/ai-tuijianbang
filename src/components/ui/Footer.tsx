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