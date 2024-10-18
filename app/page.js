"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { forbiddenWords } from "@/utils/forbiddenWords";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copyStatus, setCopyStatus] = useState("نسخ");

  useEffect(() => {
    setOutputText(filterText(inputText));
  }, [inputText]);

  const filterText = (text) => {
    return text.split(" ").map(censorWord).join(" ");
  };

  const censorWord = (word) => {
    if (forbiddenWords.some(forbidden => word.includes(forbidden))) {
      const mid = Math.floor(word.length / 2);
      const firstHalf = word.slice(0, mid);
      const secondHalf = word.slice(mid);

      return firstHalf.endsWith("ا") 
        ? firstHalf + secondHalf[0] + 'ـ ـ' + secondHalf.slice(1)
        : firstHalf + 'ـ ـ' + secondHalf;
    }
    return word;
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("تم النسخ!");
      setTimeout(() => setCopyStatus("نسخ"), 2000);
    } catch (err) {
      console.error('فشل في نسخ النص: ', err);
      setCopyStatus("فشل النسخ");
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} py-6 flex flex-col justify-start px-4 sm:px-6 lg:px-8`}>
      <Head>
        <title>الفلتر الذكي</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center w-full">
        <Image
          src="/logo.png"
          width={80}
          height={80}
          alt="خوارزميات لوجو"
          className="rounded-lg shadow-sm my-4"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">الفلتر الذكي </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl transition-colors duration-200 bg-gray-600 hover:bg-gray-700"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="max-w-md w-full mx-auto space-y-4">
        <TextArea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="أدخل النص هنا..."
          isDarkMode={isDarkMode}
        />
        <TextArea
          value={outputText}
          readOnly
          placeholder="النص المعدل سيظهر هنا..."
          isDarkMode={isDarkMode}
        />
        <CopyButton
          onClick={() => copyText(outputText)}
          status={copyStatus}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

const TextArea = ({ value, onChange, placeholder, isDarkMode, readOnly }) => (
  <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-4 relative`}>
    <textarea
      className="w-full bg-transparent resize-none outline-none"
      rows="5"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dir="rtl"
      readOnly={readOnly}
    ></textarea>
  </div>
);

const CopyButton = ({ onClick, status, isDarkMode }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center gap-2 ${
      isDarkMode ? 'bg-gray-800 hover:bg-black' : 'bg-gray-900 hover:bg-gray-600'
    } text-white transition-colors duration-200 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
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
    {status}
  </button>
);