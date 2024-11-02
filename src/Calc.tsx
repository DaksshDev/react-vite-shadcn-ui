// src/components/Calculator.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from "@/components/Navbar";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [result, setResult] = useState<number | string>('0');

  const handleInput = (value: string) => {
    setDisplay(display + value);
  };

  const calculateResult = () => {
    try {
      // Evaluate the expression safely
      // Note: Using eval can be dangerous. Consider using a math parser library for production.
      const evaluated = eval(display);
      setResult(evaluated);
      setDisplay('');
    } catch {
      setResult('Error');
    }
  };

  const handleSpecialOperation = (operation: string) => {
    try {
      const currentValue = display ? parseFloat(display) : parseFloat(result.toString());
      let newResult: number | string = 0;

      switch (operation) {
        case 'square':
          newResult = Math.pow(currentValue, 2);
          break;
        case 'cube':
          newResult = Math.pow(currentValue, 3);
          break;
        case 'sqrt':
          newResult = Math.sqrt(currentValue);
          break;
        case 'cuberoot':
          newResult = Math.cbrt(currentValue);
          break;
        default:
          return;
      }

      setResult(newResult);
      setDisplay('');
    } catch {
      setResult('Error');
    }
  };

  const clear = () => {
    setDisplay('');
    setResult('0');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-white p-4">
      <Navbar />
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-md shadow-blue-500">
        <Input
          type="text"
          value={display || result.toString()}
          readOnly
          className="text-right text-3xl p-4 bg-gray-700 text-white rounded-lg mb-6 w-full"
        />
        <div className="flex">
          {/* Functions/Operators Panel */}
          <div className="w-1/3 grid grid-rows-5 gap-3 pr-2">
            <Button
              onClick={clear}
              variant="outline"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Clear
            </Button>
            <Button
              onClick={() => handleSpecialOperation('square')}
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              x²
            </Button>
            <Button
              onClick={() => handleSpecialOperation('sqrt')}
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              √x
            </Button>
            <Button
              onClick={() => handleSpecialOperation('cube')}
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              x³
            </Button>
            <Button
              onClick={() => handleSpecialOperation('cuberoot')}
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              ∛x
            </Button>
          </div>
          {/* Numbers and Basic Operators Panel */}
          <div className="w-2/3 grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button onClick={() => handleInput('7')}>7</Button>
            <Button onClick={() => handleInput('8')}>8</Button>
            <Button onClick={() => handleInput('9')}>9</Button>
            <Button
              onClick={() => handleInput('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              ÷
            </Button>
            {/* Row 2 */}
            <Button onClick={() => handleInput('4')}>4</Button>
            <Button onClick={() => handleInput('5')}>5</Button>
            <Button onClick={() => handleInput('6')}>6</Button>
            <Button
              onClick={() => handleInput('*')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              ×
            </Button>
            {/* Row 3 */}
            <Button onClick={() => handleInput('1')}>1</Button>
            <Button onClick={() => handleInput('2')}>2</Button>
            <Button onClick={() => handleInput('3')}>3</Button>
            <Button
              onClick={() => handleInput('-')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              −
            </Button>
            {/* Row 4 */}
            <Button onClick={() => handleInput('0')} className="col-span-2">0</Button>
            <Button onClick={() => handleInput('.')}>,</Button>
            <Button
              onClick={() => handleInput('+')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              +
            </Button>
            {/* Row 5 */}
            <Button
              onClick={calculateResult}
              className="col-span-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold"
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
