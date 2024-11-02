import { useTheme } from '@/components/theme-provider'; // Path to your ShadCN theme provider
import { ModeToggle } from './ThemeStwicher'; // Keeping ModeToggle as you want it in the Navbar
import lightLogo from '../assets/light-logo.png';
import darkLogo from '../assets/dark-logo.png';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className={`w-full px-6 py-3 fixed top-0 align-top bg-opacity-70 backdrop-blur-md shadow-lg flex justify-between items-center transition-all duration-300 rounded-b-lg 
      ${theme === 'dark' ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      
      {/* Logo and title */}
      <div className="flex items-center space-x-3">
        <img
          src={theme === 'dark' ? darkLogo : lightLogo}
          alt="FireTools Logo"
          className="w-8 h-8 rounded"
        />
        <h1 className="text-lg font-semibold">FireTools</h1>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center space-x-6">
      <button className="text-sm font-medium hover:text-gray-500 transition-colors" onClick={() => navigate('/')}>Home</button>
      <button className="text-sm font-medium hover:text-gray-500 transition-colors" onClick={() => navigate('/Calc')}>Calculator</button>
        <button className="text-sm font-medium hover:text-gray-500 transition-colors" onClick={() => navigate('/Image-Convert')}>Image Converter</button>
        <button className="text-sm font-medium hover:text-gray-500 transition-colors" onClick={() => navigate('/currency-converter')}>Money Converters</button>
        <button className="text-sm font-medium hover:text-gray-500 transition-colors">All Tools</button>
        <button className="text-sm font-medium hover:text-gray-500 transition-colors">About Us</button>
      </div>

      {/* ModeToggle for theme switching */}
      <ModeToggle />
    </nav>
  );
};
