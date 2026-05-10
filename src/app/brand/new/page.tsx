'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { supabase } from '@/lib/supabase'

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
  const [error, setError] = useState('')
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
    setError('')

    try {
      // 获取当前用户
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // 解析竞品
      const competitors = formData.competitors
        ? formData.competitors.split(',').map((c) => c.trim()).filter(Boolean)
        : []

      // 保存到数据库
      const { data, error: insertError } = await supabase
        .from('brands')
        .insert({
          user_id: session.user.id,
          name: formData.name,
          industry: formData.industry,
          product: formData.product,
          city: formData.city,
          competitors: competitors,
          price_range: formData.price_range,
          highlights: formData.highlights,
        })
        .select()
        .single()

      if (insertError) throw insertError

      // 跳转到品牌详情
      router.push(`/brand/${data.id}`)
    } catch (err: any) {
      setError(err.message || '创建失败')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-2xl px-4 py-8">
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

              {error && <p className="text-sm text-red-500">{error}</p>}

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
    </div>
  )
}