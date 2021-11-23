import { defineConfig } from 'umi'
import chainWebpack from './webpack'

const isProduction = process.env.NODE_ENV === 'production'
const isStandalone = process.env.STANDALONE !== undefined
console.log('isProduction:', isProduction)
console.log('isStandalone:', isStandalone)

export default defineConfig({
  hash: false,
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  history: {
    type: 'hash',
  },
  targets: {
    ie: 11,
  },
  title: false,
  ignoreMomentLocale: true,
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: false,
    baseSeparator: '-',
  },
  manifest: {
    basePath: '/',
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  chainWebpack: isProduction ? chainWebpack : undefined,
  chunks: isProduction ? ['vendors', 'compoments', 'umi'] : undefined,
  headScripts:
    isProduction && isStandalone
      ? [
          {
            src: '/env.js',
          },
        ]
      : undefined,
  define: {
    'process.env.STANDALONE': process.env.STANDALONE,
    'process.env.VERSION': '1.1.10',
    'process.env.CURRENCY_LOCALE': process.env.CURRENCY_LOCALE ?? 'zh-CN',
    'process.env.CURRENCY_UNIT': process.env.CURRENCY_UNIT ?? 'CNY',
    'process.env.CURRENCY_MAX_DIGITS': 2,
  },
})
