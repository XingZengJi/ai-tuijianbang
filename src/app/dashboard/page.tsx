import { Header } from '@/components/ui/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
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

          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-slate-600">还没有品牌</p>
              <Link href="/brand/new">
                <Button>添加第一个品牌</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}