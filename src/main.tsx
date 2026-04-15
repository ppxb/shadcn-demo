import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import '@/styles/globals.css'
import App from './App.tsx'
import ChangelogPage from './pages/changelog.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChangelogPage />
  </StrictMode>
)
