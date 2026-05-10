'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function QueriesPage() {
  const [queries] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
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

          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-slate-600">还没有生成监测问题</p>
              <Button onClick={handleGenerate} disabled={generating}>
                {generating ? '生成中...' : '点击生成100个问题'}
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link href="/dashboard">
              <Button variant="outline">返回仪表盘</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}