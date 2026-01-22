import React, { lazy, Suspense, useEffect, useState } from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch, Redirect, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Header from './components/Header';
import Progress from './components/Progress';
const MarketingApp = lazy(() => import('./components/MarketingApp'))
const Auth = lazy(() => import('./components/AuthApp'))
const Dashboard = lazy(() => import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'CA'
})

const history = createBrowserHistory()

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard')
        }
    }, [isSignedIn])

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" >
                                <Auth onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <Dashboard />
                            </Route>
                            <Route path="/" component={MarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}

export default App
