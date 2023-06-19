import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import NProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/globals.css'
import { ToastContainer } from 'react-toastify';

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
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      const isAuthenticated = token !== null && token !== undefined;
      if (!isAuthenticated && !router.pathname.includes('/login')) {
        router.push('/login');
      }
    };
    checkToken();
  });
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - SEO Tool`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName}  - SEO Tool`}
        />
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
  )
}

// App.getInitialProps = async ({ Component, ctx }: { Component: any, ctx: any }) => {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps();
//   }
//   return { pageProps };
// };

export default App;
