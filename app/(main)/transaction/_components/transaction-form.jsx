"use client";


import { transactionSchema } from '@/app/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

import useFetch from '@/hooks/use-fetch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createTransaction, updateTransaction } from '@/actions/transaction';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Receipt } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { useRouter, useSearchParams } from 'next/navigation';
import {toast} from "sonner";
import {ReceiptScanner} from "./recipt-scanner";


const AddTransactionForm = ({accounts, categories ,  editMode = false, initialData = null,}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } =useForm({
    resolver:zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });


  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

const type=watch("type");
const isRecurring = watch("isRecurring");
const date = watch("date");

const onSubmit = async (data) => {
  const formData = {
    ...data,
    amount: parseFloat(data.amount),
  }
  if (editMode) {
    transactionFn(editId, formData);
  } else {
    transactionFn(formData);
  }
};
useEffect(() => {
  if (transactionResult?.success && !transactionLoading) {
    toast.success(
      editMode
        ? "Transaction updated successfully"
        : "Transaction created successfully"
    );
    reset();

    const accountId = transactionResult?.data?.accountId;

    if (accountId) {
      router.push(`/account/${accountId}`);
    } else {
      console.error("accountId not found in transactionResult:", transactionResult);
    }
  }
}, [transactionResult, transactionLoading, editMode ]);

const filteredCategories = categories.filter(
  (category) => category.type === type
);

const handleScanComplete = (scannedData) => {
  console.log("Scanned Data:", scannedData);
  if (scannedData) {
    setValue("amount", scannedData.amount.toString());
    setValue("date", new Date(scannedData.date));
    if (scannedData.description) {
      setValue("description", scannedData.description);
    }
    if (scannedData.category) {
      setValue("category", scannedData.category);
    }
    toast.success("Receipt scanned successfully");
  }
};


  return(
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} >
{/* AI Reciept Scanner */}
{!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}
      {/* Type */}
      <div className="space-y-2 w-full">
  <label className="text-sm font-medium text-gray-700">Type</label>
  <Select
    onValueChange={(value) => setValue("type", value)}
    defaultValue={type}
  >
    <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      <SelectValue placeholder="Select type" />
    </SelectTrigger>
    <SelectContent className="rounded-md border border-gray-200 shadow-lg bg-white">
      <SelectItem
        value="EXPENSE"
        className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50 hover:shadow-md hover:text-blue-600 rounded-md transition"
      >
        Expense
      </SelectItem>
      <SelectItem
        value="INCOME"
        className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50 hover:shadow-md hover:text-blue-600 rounded-md transition"
      >
        Income
      </SelectItem>
    </SelectContent>
  </Select>
  {errors.type && (
    <p className="text-sm text-red-500">{errors.type.message}</p>
  )}
</div>


<div className="w-full space-y-6 grid gap-6 md:grid-cols-2">
  {/* Amount Field */}
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-700">Amount</label>
    <Input
      type="number"
      step="0.01"
      placeholder="0.00"
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...register("amount")}
    />
    {errors.amount && (
      <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>
    )}
  </div>

  {/* Account Field */}
  <div className="space-y-1.5 w-full ">
    <label className="text-sm font-medium text-gray-700">Account</label>
    <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
      >
      <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">
        <SelectValue placeholder="Select Account" />
      </SelectTrigger>
      <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name} (₹
                    {parseFloat(account.balance).toFixed(2)})
                </SelectItem>
              ))}
        <CreateAccountDrawer>
          <Button
            variant="ghost"
            className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm text-left hover:bg-blue-100 transition"
          >
            Create Account
          </Button>
        </CreateAccountDrawer>
      </SelectContent>
    </Select>
    {errors.accountId && (
      <p className="text-xs text-red-500 mt-1">{errors.accountId.message}</p>
    )}
  </div>
</div>
<div className="space-y-1 w-full">
  <label className="text-sm font-medium text-gray-700">Category</label>
  <Select
  value={watch("category")}
  onValueChange={(value) => setValue("category", value)}
>
    <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">
      <SelectValue placeholder="Select category" />
    </SelectTrigger>
    <SelectContent className="rounded-md border border-gray-200 shadow-lg bg-white">
      {filteredCategories.map((category) => (
        <SelectItem
          key={category.id}
          value={category.id}
          className="cursor-pointer transition-all px-3 py-2 text-sm hover:bg-blue-50 hover:shadow-md hover:text-blue-600 rounded-md"
        >
          {category.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  {errors.category && (
    <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
  )}
</div>

     {/* Date */}
<div className="space-y-1.5 w-full">
  <label className="text-sm font-medium text-gray-700">Date</label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200",
          !date && "text-muted-foreground"
        )}
      >
        {date ? format(date, "PPP") : <span className="text-gray-400">Pick a date</span>}
        <CalendarIcon className="ml-2 h-4 w-4 text-gray-500" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-2 rounded-xl border border-gray-200 shadow-lg bg-white">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => setValue("date", date)}
        disabled={(date) =>
          date > new Date() || date < new Date("1900-01-01")
        }
        initialFocus
      />
    </PopoverContent>
  </Popover>
  {errors.date && (
    <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
  )}
</div>

  {/* Description */}
  <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input placeholder="Enter description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>


      {/* Recurring Toggle */}
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <label className="text-base font-medium">Recurring Transaction</label>
          <div className="text-sm text-muted-foreground">
            Set up a recurring schedule for this transaction
          </div>
        </div>
        <Switch
          checked={isRecurring}
          onCheckedChange={(checked) => setValue("isRecurring", checked)}
        />
      </div>

 {/* Recurring Interval */}
 {isRecurring && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Recurring Interval</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200" >

              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem
  value="DAILY"
  className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-700 hover:shadow-md hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer rounded-md"
>
  Daily
</SelectItem>
<SelectItem
  value="WEEKLY"
  className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-700 hover:shadow-md hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer rounded-md"
>
  Weekly
</SelectItem>
<SelectItem
  value="MONTHLY"
  className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-700 hover:shadow-md hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer rounded-md"
>
  Monthly
</SelectItem>
<SelectItem
  value="YEARLY"
  className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-700 hover:shadow-md hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer rounded-md"
>
  Yearly
</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

     {/* Actions */}
<div className="flex gap-4">
  <Button
    type="button"
    variant="outline"
    className="w-1/2 hover:shadow-sm transition duration-200"
    onClick={() => router.back()}
  >
    Cancel
  </Button>
  <Button type="submit"     className="w-1/2 bg-primary hover:bg-primary/90 hover:shadow-sm transition duration-200"
 disabled={transactionLoading}>
          {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </Button>
</div>

</form>
  )
}

export default AddTransactionForm
