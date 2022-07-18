import MyAccountLayout from 'Layouts/my-account'
import type { ReactElement } from 'react'
import ApplicationForm from 'Forms/application'
import type { NextPageWithLayout } from '../../_app'

const Application: NextPageWithLayout = () => (
  <ApplicationForm />
)

Application.getLayout = (page: ReactElement) => (
  <MyAccountLayout title="New Application">
    {page}
  </MyAccountLayout>
)

export default Application
