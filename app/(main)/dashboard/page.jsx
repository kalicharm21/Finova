import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React, { Suspense } from 'react';
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/actions/budget';
import BudgetProgress from './_components/budget-progress';
import DashboardOverview from './_components/transaction-overview';

async function DashboardPage() {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  const transactions = await getDashboardData();

  return (
    <div className="space-y-10 px-5 mt-6">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* Transaction Overview */}
      <Suspense fallback={<p className="text-muted-foreground text-sm">Loading Overview...</p>}>
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      </Suspense>

      {/* Accounts Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
          Your Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add New Account Card */}
          <CreateAccountDrawer>
            <Card className="h-full border-dashed border-2 hover:border-purple-400 hover:shadow-xl transition duration-300 cursor-pointer bg-white/60 backdrop-blur-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center h-full p-8 text-gray-500 hover:text-purple-700 transition-colors duration-300">
                <Plus className="h-10 w-10 mb-3" />
                <p className="text-base font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {/* Render User Accounts */}
          {accounts.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
