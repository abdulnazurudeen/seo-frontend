// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'

// import CubeOutline from 'mdi-material-ui/CubeOutline'
// import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    // {
    //   title: 'Dashboard',
    //   icon: HomeOutline,
    //   path: '/'
    // },
    {
      sectionTitle: 'Forecasting'
    },
    {
      title: 'Forecast List',
      icon: Table,
      path: '/forecast/list'
    },
    {
      title: 'New Forecast',
      icon: Login,
      path: '/forecast/new'
    },

    {
      sectionTitle: 'Plans'
    },
    {
      title: 'Plans List',
      icon: Table,
      path: '/plan/list'
    },

    // {
    //   title: 'My Plans',
    //   icon: CubeOutline,
    //   path: '/plan/my_plans'
    // },
    {
      sectionTitle: 'Profile'
    },
    {
      title: 'My Profile',
      icon: FormatLetterCase,
      path: '/profile'
    },
    {
      title: 'Contact Us',
      path: '/contact_us',
      icon: GoogleCirclesExtended
    }
  ]
}

export default navigation
