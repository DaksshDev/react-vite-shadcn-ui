// src/App.tsx
import { ToolCard } from "@/components/ToolCard";
import { useTheme } from '@/components/theme-provider'; // Path to your ShadCN theme provider
import { Navbar } from "@/components/Navbar";
import lightLogo from './assets/light-logo.png';
import darkLogo from './assets/dark-logo.png';

function App() {
  const { theme } = useTheme();
  return (
    <main className="flex mt-16 mb-8 flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex flex-col items-center gap-8 mt-8">
        <div className="inline-flex items-center gap-x-4">
        <img
          src={theme === 'dark' ? darkLogo : lightLogo}
          alt="FireTools Logo"
          className="w-24 h-24 rounded"
        />
        </div>
        <h1 className="text-3xl font-bold text-center">Welcome to FireTools</h1>
        <p className="text-center text-lg max-w-lg">
          A collection of simple, essential tools, including image resizers,
          format converters, and currency calculators.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <ToolCard
            name="Image Conversion"
            description="Convert images effortlessly."
            link="/Image-Convert"
          />
          <ToolCard
            name="Calculator"
            description="The Best looking Calculator Online!"
            link="/Calc"
          />
          <ToolCard
            name="Currency Converter"
            description="Quick currency conversions."
            link="/currency-converter"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <ToolCard
            name="Image Editor"
            description="Edit images effortlessly."
            link="/image-editor"
          />
          <ToolCard
            name="Encrypter"
            description="Encrypt Documents easily!"
            link="/Encryptor"
          />
          <ToolCard
            name="Decryptor"
            description="Decrypt Documents easily!"
            link="/Decryptor"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <ToolCard
            name="MP3 Trimmer"
            description="Trim MP3's effortlessly!"
            link="/audiotools-MP3Trimmer"
          />
          <ToolCard
            name="Zalgo Text Generator"
            description="Generate Scary Text (Zalgo Text) Ẑ̷̦̽͐a̵͍̫̝͌̾l̷̜̖͒͘g̶͔̺̫̊̐o̴̯͐"
            link="/Zalgo"
          />
          <ToolCard
            name="More Tools"
            description="More FireTools"
            link="/AllTools"
          />
        </div>
      </div>
    </main>
  );
}

export default App;
