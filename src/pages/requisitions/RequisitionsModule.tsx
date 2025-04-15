import React, { Fragment } from 'react'
import RequisitionsTable from 'src/components/requisitions-table/RequisitionsTable'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const RequisitionsModule = () => {
  return (
    <MainLayout tabTitle='Inter - Requisiciones' titleNavBar='Requisiciones' backNavBar={false}>
      <Fragment>
        <RequisitionsTable />
      </Fragment>
    </MainLayout>
  )
}

export default RequisitionsModule
