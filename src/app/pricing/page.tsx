import Link from 'next/link'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'

const plans = [
  {
    name: '免费版',
    price: '¥0',
    period: '永久',
    description: '适合体验功能',
    features: ['1次品牌检测', '基础报告', '100个Query'],
    href: '/dashboard',
  },
  {
    name: '月付版',
    price: '¥29',
    period: '/月',
    description: '适合持续运营',
    features: ['无限次检测', '月度报告', '优化建议', '竞品对比', '优先支持'],
    popular: true,
    href: '/dashboard',
  },
  {
    name: '年付版',
    price: '¥299',
    period: '/年',
    description: '适合企业客户',
    features: ['月付版全部', '定制报告', '优先处理', '专属客服', '批量品牌'],
    href: '/dashboard',
  },
]

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-center text-3xl font-bold">选择您的套餐</h1>
          <p className="mb-12 text-center text-slate-600">根据您的需求选择合适的套餐</p>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.popular ? 'border-primary-600' : ''}>
                {plan.popular && (
                  <div className="rounded-t-lg bg-primary-600 px-4 py-1 text-center text-sm text-white">最受欢迎</div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-4xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-slate-500">{plan.period}</span>
                  </p>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href={plan.href}>
                    <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'}>立即订阅</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}