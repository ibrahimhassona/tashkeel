"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { censorWords, tashkeel } from "@/utils/tashkeel";
import Image from "next/image";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for user's preferred color scheme
    if (typeof window !== "undefined") {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const processText = async () => {
    let processed = await tashkeel(inputText);
    processed = censorWords(processed);
    setOutputText(processed);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("تم نسخ النص بنجاح!");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } py-6 flex flex-col justify-start px-4 sm:px-6 lg:px-8`}
    >
      <Head>
        <title>تَنْسِيقُ اللُّغَة</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* ============= Logo =========== */}
      <div className="flex items-center justify-center w-full">
        <Image
          src="/logo.png"
          width={300}
          height={300}
          alt="خوارزميات لوجو"
          className="rounded-full w-[80px] h-[80px] shadow-sm my-4"
        />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">تَنْسِيقُ اللُّغَة</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-600"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="max-w-md w-full mx-auto space-y-4">
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg p-4 relative`}
        >
          <textarea
            id="inputText"
            className="w-full bg-transparent resize-none outline-none"
            rows="5"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="أدخل النص هنا..."
            dir="rtl"
          ></textarea>
        </div>

        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg p-4 relative`}
        >
          <div
            id="outputText"
            className="w-full min-h-[100px] bg-transparent outline-none overflow-auto"
            dir="rtl"
          >
            {outputText}
          </div>
        </div>

        {/* ------------ BTNS ----------- */}
        <div className='w-full flex items-center justify-center gap-2'>
          <button
            onClick={processText}
            className={`w-full flex items-center justify-center gap-2 ${isDarkMode ? 'bg-gray-800 hover:bg-black ':'bg-gray-900 hover:bg-gray-600 '} text-white cust-trans  font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
          >
            معالجة النص
          </button>
          <button
            onClick={() => copyText(outputText)}
            className={`w-full flex items-center justify-center gap-2 ${isDarkMode ? 'bg-gray-800 hover:bg-black ':'bg-gray-900 hover:bg-gray-600 '} text-white cust-trans  font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            نسخ
          </button>
        </div>
      </div>
    </div>
  );
}
