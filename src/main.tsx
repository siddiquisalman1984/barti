import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ChosenThemeProvider, ThemeProvider } from '@/providers';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <ChosenThemeProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ChosenThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
