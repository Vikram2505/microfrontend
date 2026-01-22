import React, { lazy, Suspense, useState } from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Progress from './components/Progress';
const MarketingApp = lazy(() => import('./components/MarketingApp'))
const Auth = lazy(() => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'CA'
})

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" >
                                <Auth onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}

export default App
