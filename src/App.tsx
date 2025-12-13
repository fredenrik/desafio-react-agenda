import { BrowserRouter } from 'react-router-dom';
import { ResponsiveProvider } from './context';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ResponsiveProvider>
        <AppRoutes />
      </ResponsiveProvider>
    </BrowserRouter>
  );
}

export default App;
