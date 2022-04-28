import ReactDOM  from 'react-dom';
import {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { App } from './App';
// import './style.scss'

const mount = (el, { onSignIn ,onNavigate, defaultHistory, initialPath }) => {

  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  if (onNavigate) {
    history.listen(onNavigate);
  }
  const rootElement = document.getElementById('_auth-dev-root');
  const root = createRoot(rootElement);
  root.render(
      <StrictMode>
        <App onSignIn={onSignIn} history={history} />
      </StrictMode>
  )

  return {
    onParentNavigate({ pathname: nextPathName }) {
      const { pathname } = history.location;
      if (pathname !== nextPathName) {
        history.push(nextPathName)
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount }
