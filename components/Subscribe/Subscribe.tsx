import { useState, useRef } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import { Form, FormState, Subscribers } from '../../types/subscribe.d';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import fetcher from '../../lib/fetcher';

export default function Subscribe() {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef(null);
  const { data } = useSWR<Subscribers>('/api/subscribers', fetcher);
  const subscriberCount = new Number(data?.count);

  const subscribeUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch('/api/subscribeUser', {
      body: JSON.stringify({
        email: (inputEl.current as any).value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    (inputEl.current as any).value = '';
    setForm({
      state: Form.Success,
      message: `Hooray! You're now on the list.`,
    });
  };

  return (
    <div className="border rounded p-6 my-4 w-full dark:border-gray-800 dark:bg-blue-opaque">
      <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
        Subscribe to the newsletter
      </p>
      <p className="my-1 text-gray-800 dark:text-gray-200">
        Get emails about new blog posts and updates about the Crawford Genealogy
        Project.
      </p>
      <form className="relative my-4" onSubmit={subscribeUser}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="george@washington.com"
          type="email"
          autoComplete="email"
          required
          className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pr-32"
        />
        <button
          className="flex items-center justify-center absolute right-1 top-1 px-4 pt-1 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
          type="submit">
          {form.state === Form.Loading ? <LoadingSpinner /> : 'Subscribe'}
        </button>
      </form>
      {form.state === Form.Error ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === Form.Success ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : (
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {`${
            subscriberCount > 0 ? subscriberCount.toLocaleString() : '-'
          } subscriber${subscriberCount.toLocaleString() === '1' ? '' : 's'}`}
        </p>
      )}
    </div>
  );
}
