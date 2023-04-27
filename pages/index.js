// pages/index.js
import Head from "next/head";
import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { FaLeaf, FaChevronDown } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
// import Image from "next/image";

export default function Home() {
  const [healthInput, setHealthInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [healthOutput, setHealthOutput] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        health: healthInput,
      }),
    });

    if (!response.ok) {
      toast.error(`Request failed with status ${response.status}`);
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      // console.log(chunkValue);
      setHealthOutput((prev) => prev + chunkValue);
    }
  }

  useEffect(() => {
    console.log(healthOutput);
    console.log(healthOutput.split("[SEP]").filter((x) => x.endsWith("}")));
  }, [healthOutput]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <Head>
        <title>Health Align</title>
        {/* <Image
          src="/dog.png"
          alt="Health Align Favicon"
          width={32}
          height={32}
        /> */}
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
              Health Align
            </h1>
            {/* Add navigation links or additional information here */}
          </div>
        </div>
      </header>

      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
              Health Align
            </h1>
            <p className="mt-2 text-center text-gray-600 text-lg">
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
                    placeholder="e.g., Insomnia, Inflammation, Heart Health"
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
            {healthOutput && (
              <div className="mt-8 bg-white shadow sm:rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Results
                </h3>
                <div className="mt-4 space-y-4">
                  {healthOutput
                    .split("[SEP]")
                    .filter((x) => x.endsWith("}"))
                    .map((x) => JSON.parse(x))
                    .map((x) => (
                      <Disclosure
                        key={x.question || x.Question}
                        className="bg-gray-100 rounded-md shadow mb-4"
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-xl font-semibold text-left text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                              {x.question || x.Question}
                              <FaChevronDown
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } transition-transform duration-200`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-2 pb-4 text-gray-600">
                              {x.answer || x.Answer}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                </div>
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
        <footer className="bg-white shadow mt-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Health Align. All rights
              reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
