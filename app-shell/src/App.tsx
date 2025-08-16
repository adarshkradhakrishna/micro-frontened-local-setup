import React, { Fragment, Suspense } from 'react'
import SharedHeaderComponent from 'shared_header/HeaderComponent'
function App() {
  return (
    <Fragment>
        <div> App Component Host (App Shell)</div>
        <Suspense fallback={<div>Loading...</div>}>
            <SharedHeaderComponent />
        </Suspense>
    </Fragment>
  )
}

export default App