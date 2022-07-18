import type { ReactElement } from 'react'
import MyAccountLayout from 'Layouts/my-account'
import type { NextPageWithLayout } from '../_app'

const Settings: NextPageWithLayout = () => (
  <div>
    Settings
  </div>
)

Settings.getLayout = (page: ReactElement) => (
  <MyAccountLayout title="Settings">
    {page}
  </MyAccountLayout>
)

export default Settings
