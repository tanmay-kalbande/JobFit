import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ResumeProvider, UIProvider, SettingsProvider } from './contexts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <UIProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </UIProvider>
    </SettingsProvider>
  </StrictMode>,
)

