'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/ui/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { supabase } from '@/lib/supabase'
import type { Brand } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setSession(session)

    if (!session) {
      router.push('/login')
      return
    }

    // 加载品牌数据
    const { data } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setBrands(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-slate-600">加载中...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">我的品牌</h1>
              <p className="text-slate-600">已登录：{session?.user?.email}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleLogout}>退出登录</Button>
              <Link href="/brand/new">
                <Button>添加品牌</Button>
              </Link>
            </div>
          </div>

          {brands.length === 0 ? (
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
                  <CardContent>
                    <h3 className="font-semibold">{brand.name}</h3>
                    <p className="text-sm text-slate-600">
                      {brand.industry} · {brand.city}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Link href={`/brand/${brand.id}`}>
                        <Button variant="outline" size="sm">查看</Button>
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
      </main>
    </div>
  )
}