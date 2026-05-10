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
                    基于检测结果，给出具体的优化建议，帮助您补齐&quot;事实资产&quot;。
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