'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface DetectPageProps {
  params: { id: string }
}

const platforms = [
  { id: 'doubao', name: '豆包' },
  { id: 'qianwen', name: '千问' },
  { id: 'deepseek', name: 'DeepSeek' },
  { id: 'metaso', name: '秘塔' },
]

// 模拟数据
const sampleQueries = [
  { id: '1', text: '北京空调维修哪家好', status: null },
  { id: '2', text: '空调不制冷怎么办', status: null },
  { id: '3', text: '空调加氟多少钱', status: null },
  { id: '4', text: '空调维修师傅推荐', status: null },
  { id: '5', text: '、北京空调维修公司', status: null },
  { id: '6', text: '空调不制热怎么修', status: null },
  { id: '7', text: '变频空调维修', status: null },
  { id: '8', text: '中央空调维护', status: null },
  { id: '9', text: '空调清洗服务', status: null },
  { id: '10', text: '空调噪音大怎么办', status: null },
]

export default function DetectPage({ params }: DetectPageProps) {
  const [queries, setQueries] = useState(sampleQueries)
  const [currentPlatform, setCurrentPlatform] = useState('doubao')
  const [results, setResults] = useState<Record<string, boolean>>({})

  const handleRecord = (queryId: string) => {
    const result = prompt('查询: ' + queries.find(q => q.id === queryId)?.text + '\n\n您的品牌被推荐了吗？(yes/no)')
    if (result !== null) {
      setResults(prev => ({ ...prev, [queryId]: result.toLowerCase() === 'yes' }))
    }
  }

  const getStatus = (queryId: string) => {
    if (results[queryId] === undefined) return null
    return results[queryId]
  }

  const total = Object.keys(results).length
  const recommended = Object.values(results).filter(Boolean).length

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI检测</h1>
              <p className="text-slate-600">在 {platforms.find(p => p.id === currentPlatform)?.name} 检测您的品牌</p>
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
              <CardTitle>检测进度: {recommended}/{total}</CardTitle>
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

          <div className="space-y-2">
            {queries.slice(0, 10).map((query) => {
              const status = getStatus(query.id)
              return (
                <div
                  key={query.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium">{query.text}</p>
                    {status !== null && (
                      <p className={`text-sm ${status ? 'text-green-600' : 'text-slate-500'}`}>
                        {status ? '✓ 已推荐' : '✗ 未推荐'}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={status !== null ? 'outline' : 'primary'}
                    onClick={() => handleRecord(query.id)}
                  >
                    {status !== null ? '修改' : '记录'}
                  </Button>
                </div>
              )
            })}
            {queries.length > 10 && (
              <p className="text-center text-slate-500">还有 {queries.length - 10} 个问题...</p>
            )}
          </div>

          <div className="flex justify-between">
            <Link href={`/brand/${params.id}/queries`}>
              <Button variant="outline">返回Query</Button>
            </Link>
            <Link href={`/brand/${params.id}/report`}>
              <Button>查看报告</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}