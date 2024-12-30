import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, Percent } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PropertyEvaluationTools() {
  const { toast } = useToast();
  const [values, setValues] = useState({
    purchasePrice: "",
    annualIncome: "",
    operatingExpenses: "",
    downPayment: "",
  });

  const calculateNOI = () => {
    const income = parseFloat(values.annualIncome);
    const expenses = parseFloat(values.operatingExpenses);
    if (isNaN(income) || isNaN(expenses)) return 0;
    return income - expenses;
  };

  const calculateCapRate = () => {
    const noi = calculateNOI();
    const price = parseFloat(values.purchasePrice);
    if (isNaN(price) || price === 0) return 0;
    return (noi / price) * 100;
  };

  const calculateCoCReturn = () => {
    const noi = calculateNOI();
    const downPayment = parseFloat(values.downPayment);
    if (isNaN(downPayment) || downPayment === 0) return 0;
    return (noi / downPayment) * 100;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalculate = () => {
    const noi = calculateNOI();
    const capRate = calculateCapRate();
    const cocReturn = calculateCoCReturn();

    toast({
      title: "Calculation Results",
      description: (
        <div className="mt-2 space-y-2">
          <p>NOI: ${noi.toLocaleString()}</p>
          <p>Cap Rate: {capRate.toFixed(2)}%</p>
          <p>Cash-on-Cash Return: {cocReturn.toFixed(2)}%</p>
        </div>
      ),
    });
  };

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Property Evaluation Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="purchasePrice"
                  name="purchasePrice"
                  placeholder="Enter purchase price"
                  type="number"
                  className="pl-9"
                  value={values.purchasePrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="annualIncome"
                  name="annualIncome"
                  placeholder="Enter annual income"
                  type="number"
                  className="pl-9"
                  value={values.annualIncome}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingExpenses">Operating Expenses</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="operatingExpenses"
                  name="operatingExpenses"
                  placeholder="Enter operating expenses"
                  type="number"
                  className="pl-9"
                  value={values.operatingExpenses}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="downPayment">Down Payment</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="downPayment"
                  name="downPayment"
                  placeholder="Enter down payment"
                  type="number"
                  className="pl-9"
                  value={values.downPayment}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <Button 
            onClick={handleCalculate}
            className="w-full"
            size="lg"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Metrics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}