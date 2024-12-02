import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight dark:text-white">
        Salesman Pathing
        </h1>

        <p>
        Get started by <span className="font-bold">choosing an algorithm</span>.
        </p>

        <div className="grid grid-cols-3 gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/nearest-neighbor"
            target="_self"
            rel="noopener noreferrer"
          >
            Nearest Neighbor
          </a>
          <a
            className="rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-amber-500 to-pink-500 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/best-edge"
            target="_self"
            rel="noopener noreferrer"
          >
            Best Edge
          </a>
          <a
            className="rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-teal-400 to-yellow-200 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/dijkstra"
            target="_self"
            rel="noopener noreferrer"
          >
            Dijkstra's Algorithm
          </a>
          <a
            className="rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/kruskal"
            target="_self"
            rel="noopener noreferrer"
          >
            Kruskal's Algorithm
          </a>
          <a
            className="rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/critical"
            target="_self"
            rel="noopener noreferrer"
          >
            Critical Path Algorithm
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/joswinjohn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to Source →
        </a>
      </footer>
    </div>
  );
}
