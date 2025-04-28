import { getUserAccounts } from '@/actions/dashboard';
import React from 'react';
import AddTransactionForm from '../_components/transaction-form';
import { defaultCategories } from '@/data/categories';
import { getTransaction } from '@/actions/transaction';

const AddTransactionPage = async ({ searchParams }) => {
  const accounts = await getUserAccounts();

  const editId = searchParams?.edit;
  let initialData = null;

  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <div className="flex justify-center md:justify-start mb-10">
        <h1
          className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] bg-clip-text text-transparent"
          style={{
            animation: 'gradientMove 4s ease infinite',
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 50%',
          }}
        >
          {editId ? 'Edit' : 'Add'} Transaction
        </h1>
      </div>

      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />

      {/* Inline keyframes with style tag */}
      <style>
        {`
          @keyframes gradientMove {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AddTransactionPage;
