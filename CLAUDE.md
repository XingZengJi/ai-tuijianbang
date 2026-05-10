# AI推荐帮

> 帮助中小微企业的品牌被AI看见、被AI理解、被AI推荐的SaaS工具

## 项目定位

- **产品名**：AI推荐帮
- **产品形态**：Web应用（SaaS）
- **目标客户**：中国境内中小微企业
- **核心价值**：帮助客户了解自己的品牌在AI搜索中的可见性，并提供优化建议

## 商业模式

- **免费版**：1次完整检测+基础报告
- **月付29元**：持续监测+月度报告+优化建议
- **年付299元**：更多功能+优先服务+定制报告

## 技术栈

- **前端**：Next.js + React + Tailwind CSS
- **后端**：Next.js API Routes
- **数据库**：PostgreSQL (Supabase 或 Neon)
- **部署**：Vercel
- **开发方式**：Vibe Coding (Cursor/Windsurf)

## 项目结构

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # 首页/落地页
│   │   ├── layout.tsx           # 根布局
│   │   ├── globals.css         # 全局样式
│   │   ├── api/                # API Routes
│   │   │   ├── brand/          # 品牌相关API
│   │   │   ├── query/         # Query生成API
│   │   │   ├──检测/           # 检测执行API
│   │   │   └── report/        # 报告生成API
│   │   ├── dashboard/         # 用户仪表盘
│   │   ├── 检测/              # 检测页面
│   │   ├── 报告/              # 报告页面
│   │   └── pricing/           # 定价页面
│   ├── components/            # React组件
│   │   ├── ui/                # 基础UI组件
│   │   ├── form/              # 表单组件
│   │   ├── report/            # 报告组件
│   │   └── layout/            # 布局组件
│   ├── lib/                   # 工具函数
│   │   ├── db.ts              # 数据库操作
│   │   ├── ai.ts              # AI调用
│   │   └── utils.ts           # 通用工具
│   └── types/                 # TypeScript类型
├── public/                    # 静态资源
├── docs/                      # 文档
├── SPEC.md                    # 设计文档
└── README.md                  # 项目说明
```

## 核心功能流程

1. **落地页** → 展示价值，引导注册
2. **资料填写** → 品牌名、行业、产品、城市、竞品
3. **Query生成** → 四层机制生成100个问题
4. **检测执行** → 在AI平台搜索，记录结果
5. **报告输出** → 可见性分数+诊断+建议
6. **订阅转化** → 免费转付费

## 命名规范

- 页面路由：中文（如 `/检测`、`/报告`）
- 组件：PascalCase（如 `BrandForm.tsx`）
- 工具函数：camelCase（如 `generateQuery.ts`）
- CSS类：Tailwind Utility

## 开发纪律

- MVP阶段不做过度设计
- 先跑通核心闭环，再迭代
- 每个功能必须有可见的交付物
- 保持简单，保持迭代

## 验证标准

- 第一年目标：1000付费用户
- MVP验证：3-5个种子用户完成付费闭环