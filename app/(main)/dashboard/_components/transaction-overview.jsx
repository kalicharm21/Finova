"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
    "#D4A5A5",
    "#9FA8DA",
  ];


  
const DashboardOverview = ({accounts, transactions }) => {
    const [selectedAccountId, setSelectedAccountId] = useState(
        accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
      );
      
      // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

   // Get recent transactions (last 5)
   const recentTransactions = accountTransactions
   .sort((a, b) => new Date(b.date) - new Date(a.date))
   .slice(0, 5);



  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

   // Group expenses by category
   const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

    // Format data for pie chart
    const pieChartData = Object.entries(expensesByCategory).map(
        ([category, amount]) => ({
          name: category,
          value: amount,
        })
      );
    


   return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <Card className="shadow-lg rounded-2xl border border-gray-200">
  <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
    <CardTitle className="text-lg font-semibold text-gray-400">
      Recent Transactions
    </CardTitle>
    <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </CardHeader>

  <CardContent>
    <div className="space-y-4">
      {recentTransactions.length === 0 ? (
        <p className="text-center text-muted-foreground py-6 text-sm italic">
          No recent transactions found.
        </p>
      ) : (
        recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-md bg-muted p-4 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="space-y-1">
              <p className="text-base font-medium text-foreground">
                {transaction.description || "Untitled Transaction"}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(transaction.date), "PP")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center text-sm font-semibold",
                  transaction.type === "EXPENSE"
                    ? "text-red-500"
                    : "text-green-600"
                )}
              >
                {transaction.type === "EXPENSE" ? (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                )}
                ₹{transaction.amount.toFixed(2)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </CardContent>
</Card>

      {/* Expense Breakdown Card */}
      <Card className="shadow-xl rounded-2xl border border-gray-200 p-4 hover:shadow-2xl transition-all duration-300">
  <CardHeader className="pb-2">
    <CardTitle className="text-lg font-semibold text-gray-800">
      Monthly Expense Breakdown
    </CardTitle>
  </CardHeader>

  <CardContent className="px-2 pb-6">
    {pieChartData.length === 0 ? (
      <p className="text-center text-muted-foreground py-6 text-sm italic">
        No expenses this month
      </p>
    ) : (
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              label={({ name, value }) => `${name}: ₹${value.toFixed(0)}`}
              labelLine={false}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `₹${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: "0.875rem",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={50}
              iconType="circle"
              layout="horizontal"
              align="center"
              wrapperStyle={{
                fontSize: "0.875rem",
                marginTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )}
  </CardContent>
</Card>
    </div>
  );
}

export default DashboardOverview
