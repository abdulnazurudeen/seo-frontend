import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import { CookiesProvider } from 'react-cookie'
import { useCookies } from 'react-cookie'
import { getCurrentUser } from 'src/@core/utils/helper'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}
const App = (props: ExtendedAppProps) => {
  const router = useRouter()
  const [cookie, _, removeCookie] = useCookies(['token']) // eslint-disable-line
  useEffect(() => {
    const { token } = cookie
    const checkToken = async () => {
      const user = await getCurrentUser(token)
      const isAuthenticated = token !== null && token !== undefined && user
      if (!isAuthenticated && !router.pathname.includes('/login') && !router.pathname.includes('/register')) {
        removeCookie('token')
        router.push('/login')
      } else if ((isAuthenticated && router.pathname.includes('/login')) || router.pathname.includes('/register')) {
        router.push('/')
      }
      // else {
      //   console.log(isAuthenticated, 'isAuthenticated succcess so i redirect to home')
      //   router.push('/')
      // }
    }
    checkToken()
  }, [cookie, router])
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CookiesProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - SEO Tool`}</title>
          <meta name='description' content={`${themeConfig.templateName}  - SEO Tool`} />
          <meta name='keywords' content='' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
        <ToastContainer />
      </CacheProvider>
    </CookiesProvider>
  )
}

// App.getInitialProps = async ({ Component, ctx }: { Component: any, ctx: any }) => {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps();
//   }
//   return { pageProps };
// };

export default App
