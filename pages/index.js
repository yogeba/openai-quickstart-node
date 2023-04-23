// pages/index.js
import Head from "next/head";
import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FaLeaf, FaChevronDown } from "react-icons/fa";

export default function Home() {
  const [healthInput, setHealthInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ health: healthInput }),
      });

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      let results;
      if (Array.isArray(data.result)) {
        results = data.result;
      } else {
        results = JSON.parse(data.result);
      }

      const elements = results.map((item, index) => {
        return (
          <Disclosure
            key={index}
            className="bg-gray-100 rounded-md shadow mb-4"
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-xl font-semibold text-left text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                  {item.Question}
                  <FaChevronDown
                    className={`${
                      open ? "transform rotate-180" : ""
                    } transition-transform duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-4 text-gray-600">
                  {item.Answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      });

      setResult(elements);
      setHealthInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Supplement Search</title>
        <link rel="icon" href="/dog.png" />
        <link href="/dist/output.css" rel="stylesheet"></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>

      {/* Navigation/Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaLeaf className="mr-2" />
              Supplement Search
            </h1>
            {/* Add navigation links or additional information here */}
          </div>
        </div>
      </header>

      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-center text-gray-900">
              Supplement Search
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Self-evaluate your optimal health needs
            </p>
            <div className="mt-8 bg-white shadow sm:rounded-lg">
              <form
                onSubmit={onSubmit}
                className="px-8 py-6 grid grid-cols-1 gap-6"
              >
                <label className="block">
                  <span className="text-gray-700">
                    Enter a health condition, symptom, disease, or outcome
                  </span>
                  <input
                    type="text"
                    name="health"
                    value={healthInput}
                    onChange={(e) => setHealthInput(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Generate"}
                </button>
              </form>
            </div>
            {result && (
              <div className="mt-8 bg-white shadow sm:rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Results
                </h3>
                <div className="mt-4 space-y-4">{result}</div>
              </div>
            )}
          </div>
          {/* Supplementary information */}
          <aside className="space-y-8">
            <div className="bg-white shadow sm:rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Popular Supplements
              </h3>
              <ul className="mt-4 space-y-2">
                {/* Replace with actual popular supplements */}
                <li>Vitamin D</li>
                <li>Omega-3</li>
                <li>Magnesium</li>
              </ul>
            </div>

            {/* Add more supplementary information sections here */}
          </aside>
        </div>
      </main>
    </div>
  );
}
