import MyAccountLayout from 'Layouts/my-account'
import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import type { NextPageWithLayout } from '../../_app'

const Application: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      {`Application: ${id}`}
    </div>
  )
}

Application.getLayout = (page: ReactElement) => (
  <MyAccountLayout title="Application">
    {page}
  </MyAccountLayout>
)

export default Application
