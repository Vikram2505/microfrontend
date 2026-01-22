import React from "react";
import ReactDom from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from "./App";

// In micro frontend routing we have BrowserRouter is used like Browser History, Memory History, Hash History
// Browser router create Browser History object is inside container which has access of URL object
// for Memory Route we need to pass history.
const mount = (el, { onNavigate, initialPath, defaultHistory, onSignIn }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })

    if (onNavigate) {
        history.listen(onNavigate)
    }

    ReactDom.render(<App history={history} onSignIn={onSignIn} />, el)

    return {
        onParentNavigate({ pathname: nextPathName }) {
            const { pathname } = history.location
            if (pathname !== nextPathName) {
                history.push(location)
            }

        }
    }
}

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root')

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}

export { mount }