import React, { FormEvent, useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

const Options: React.FC = () => {
  const [host, setHost] = useState('');
  const [token, setToken] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    chrome.storage.sync.get(
      {
        apiHost: '',
        apiToken: '',
      },
      (items) => {
        setHost(items.apiHost);
        setToken(items.apiToken);
      }
    );
  };

  const updateConfig = (event: FormEvent) => {
    event.preventDefault();
    chrome.storage.sync.set(
      {
        apiHost: host,
        apiToken: token,
      },
      () => {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 1000);
      }
    );
  };

  return (
    <main className="mx-auto p-10 container place-content-center h-screen">
      <form
        className="shadow-md rounded-lg p-3 text-center text-sm font-medium mx-auto w-full md:w-5/6 lg:w-2/3 xl:w-1/2"
        onSubmit={updateConfig}
      >
        <h1 className="text-3xl font-bold my-6">Settings</h1>
        <div className="my-4">
          <label className="mr-2 block mb-2 text-base">API Host:</label>
          <input
            type="url"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            pattern={'https?://.*'}
            placeholder="https://xxx.herokuapp.com/"
            required
            className="peer"
          />
          <div className="invisible peer-invalid:visible text-xs mt-1 text-rose-500">
            API Host must be a valid URL like "https://xxx.herokuapp.com/".
          </div>
        </div>
        <div className="my-4">
          <label className="mr-2 block mb-2 text-base">Bot Token:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="12345:AbCdEfGhIJklmnOpqrStuvWXyz"
            required
          />
        </div>
        <button
          formAction="submit"
          className="
            rounded-md shadow px-4 py-2 my-2
            gradient-theme hover:bg-black
            text-white font-semibold text-sm
            focus:ring ring-orange-200"
        >
          Save
        </button>
        <span
          className={
            'ml-2 absolute my-4 transition duration-300 opacity-0' +
            (saved ? 'opacity-100' : '')
          }
        >
          <FiCheck
            size={18}
            className="text-emerald-500 inline"
            strokeWidth={3}
          />
        </span>
      </form>
    </main>
  );
};

export default Options;
