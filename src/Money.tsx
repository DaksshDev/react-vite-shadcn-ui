import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Define currency types and symbols
type Currency = {
  code: string;
  name: string;
  rate: number;
};

const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  // Add more as needed
};

const Money: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  // Fetch currency rates from Frankfurter API
  const fetchCurrencies = async () => {
    try {
      const response = await fetch("https://api.frankfurter.app/latest");
      const data = await response.json();
      const currencyArray = Object.keys(data.rates).map((key) => ({
        code: key,
        name: key,
        rate: data.rates[key],
      }));
      setCurrencies(currencyArray);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  // Convert the amount
  const convertCurrency = () => {
    const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1;
    setConvertedAmount((amount * toRate) / fromRate);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mt-28 max-w-3xl mx-auto top-0 p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Currency Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                value={amount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) setAmount(value); // Only update if greater than 0
                }}
                onBlur={() => {
                  if (amount < 1) setAmount(1); // Ensure amount is at least 1 on blur
                }}
                min={1}
                className="w-full"
                placeholder="Enter amount"
              />

              <Select onValueChange={(value) => setFromCurrency(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="From Currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currencySymbols[currency.code] || ""} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center text-xl font-bold">
              to
            </div>
            <Select onValueChange={(value) => setToCurrency(value)}>
              <SelectTrigger>
                <SelectValue placeholder="To Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currencySymbols[currency.code] || ""} {currency.name}
                  </SelectItem>
                ))}
                </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              {amount.toLocaleString()} {currencySymbols[fromCurrency] || ""} {fromCurrency} ={" "}
              {currencySymbols[toCurrency] || ""} {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
              {toCurrency}
            </div>
            <Button onClick={convertCurrency}>Convert</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Money;
