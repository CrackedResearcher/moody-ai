import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans p-8">
      <main className="flex flex-col items-center text-center gap-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent sm:text-7xl">
          MoodyAI
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl">
          Welcome to MoodyAI! Track your emotions and take charge of your mental well-being with ease.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-8 sm:px-10"
            href="/login"
          >
            Login
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-8 sm:px-10"
            href="/register"
          >
            Register
          </a>
        </div>
      </main>
    </div>
  );
}