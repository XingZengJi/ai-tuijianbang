'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface BrandDetailPageProps {
  params: { id: string }
}

export default function BrandDetailPage({ params }: BrandDetailPageProps) {
  const [brand] = useState({
    id: params.id,
    name: '示例品牌',
    industry: '本地服务',
    product: '空调维修',
    city: '北京',
    price_range: '100-500元',
    highlights: '专业维修团队',
    competitors: ['竞品A', '竞品B'],
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{brand.name}</h1>
              <p className="text-slate-600">{brand.industry} · {brand.city}</p>
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
                <div>
                  <dt className="text-sm font-medium text-slate-500">价格带</dt>
                  <dd>{brand.price_range}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-slate-500">核心卖点</dt>
                  <dd>{brand.highlights}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-slate-500">竞品</dt>
                  <dd>{brand.competitors.join(', ')}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}