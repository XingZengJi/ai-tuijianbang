'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'

interface ReportPageProps {
  params: { id: string }
}

export default function ReportPage({ params }: ReportPageProps) {
  const [score] = useState(65)
  const [issues] = useState([
    { id: '1', type: 'high', text: '您的品牌在AI搜索中推荐度较低，建议优化官网信息' },
    { id: '2', type: 'medium', text: '缺少FAQ页面，用户常见问题未覆盖' },
  ])
  const [suggestions] = useState([
    { id: '1', type: 'content', text: '在官网添加FAQ页面，回答用户常见问题', priority: 'high' },
    { id: '2', type: 'platform', text: '在大众点评、小红书等平台完善品牌信息', priority: 'medium' },
    { id: '3', type: 'structural', text: '使用结构化数据标记品牌信息', priority: 'low' },
  ])

  const getScoreColor = (s: number) => {
    if (s >= 70) return 'text-green-600'
    if (s >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">检测报告</h1>

          <Card>
            <CardHeader>
              <CardTitle>可见性分数</CardTitle>
              <CardDescription>基于检测结果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className={`text-6xl font-bold ${getScoreColor(score)}`}>{score}</p>
                <p className="text-slate-500">分</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>问题诊断</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {issues.map((issue) => (
                  <li key={issue.id} className="flex items-start gap-2">
                    <span className={`mt-1 rounded px-1 py-0.5 text-xs ${
                      issue.type === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{issue.type}</span>
                    <span>{issue.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>优化建议</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {suggestions.map((s) => (
                  <li key={s.id} className="flex items-start gap-2">
                    <span className={`mt-1 rounded px-1 py-0.5 text-xs ${
                      s.priority === 'high' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>{s.type}</span>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link href={`/brand/${params.id}/detect`}>
              <Button variant="outline">返回检测</Button>
            </Link>
            <Link href={`/brand/${params.id}`}>
              <Button>返回品牌</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}