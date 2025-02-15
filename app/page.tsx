import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-[99999] h-14 w-full select-none border-transparent border-b">
      <div className="size-full">
        <section className="mx-auto h-full w-full max-w-full px-4 md:max-w-screen-xl md:px-12 lg:px-20 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <a href="/">
              <span className="!leading-none font-bold font-heading text-lg">
                Moody AI
              </span>
            </a>
            <nav 
              aria-label="Main" 
              className="relative z-[999] max-w-max flex-1 items-center justify-center hidden lg:flex"
            >
              <div style={{ position: "relative" }}>
                <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
                  {/* Features Dropdown */}
                  <li>
                    <button
                      className="group inline-flex h-8 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors text-neutral-400 hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      data-state="closed"
                    >
                      Features
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </li>
                  
                  {/* Pricing Link */}
                  <li>
                    <a
                      className="group inline-flex h-8 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors text-neutral-400 hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      href="/pricing"
                    >
                      Pricing
                    </a>
                  </li>

                  {/* Enterprise Link */}
                  <li>
                    <a
                      className="group inline-flex h-8 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors text-neutral-400 hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      href="/enterprise"
                    >
                      Enterprise
                    </a>
                  </li>

                  {/* Resources Dropdown */}
                  <li>
                    <button
                      className="group inline-flex h-8 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors text-neutral-400 hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      data-state="closed"
                    >
                      Resources
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </li>

                  {/* Changelog Link */}
                  <li>
                    <a
                      className="group inline-flex h-8 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors text-neutral-400 hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      href="/changelog"
                    >
                      Changelog
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Right Side Navigation */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-x-4">
              <a
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3"
                href="/sign-in"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-zap ml-1.5 size-3.5 fill-orange-500 text-orange-500"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center justify-end lg:hidden">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all hover:bg-accent hover:text-accent-foreground h-8 w-8"
              type="button"
              aria-haspopup="dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </header>

      <section className="mx-auto h-full w-full max-w-full px-4 md:max-w-screen-xl md:px-12 lg:px-20 mt-14">
        <div className="flex w-full flex-col items-center justify-center bg-gradient-to-t from-background text-center">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
              <span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-primary/20 blur-md" />
              <span className="z-10 flex items-center justify-center gap-1 py-0.5 text-neutral-100 text-sm">
                ✨ Your personal mood tracker
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>

            <h1 className="!leading-[1.15] w-full text-balance py-6 text-center font-heading font-medium text-5xl text-foreground tracking-normal sm:text-6xl md:text-7xl lg:text-8xl">
              <span
                className="relative inline-flex after:content-[attr(data-text)] after:absolute after:top-[0.04em] after:z-[-1] after:left-[0.04em] after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)] after:bg-clip-text after:text-transparent after:animate-line-shadow"
                data-text="Your"
              >
                Your
              </span>{" "}
              <span
                className="relative inline-flex after:content-[attr(data-text)] after:absolute after:top-[0.04em] after:z-[-1] after:left-[0.04em] after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)] after:bg-clip-text after:text-transparent after:animate-line-shadow bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
                data-text="personal"
              >
                personal
              </span>{" "}
              <span
                className="relative inline-flex after:content-[attr(data-text)] after:absolute after:top-[0.04em] after:z-[-1] after:left-[0.04em] after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)] after:bg-clip-text after:text-transparent after:animate-line-shadow"
                data-text="mood tracker"
              >
                mood tracker
              </span>{" "}
              <span
                className="relative inline-flex after:content-[attr(data-text)] after:absolute after:top-[0.04em] after:z-[-1] after:left-[0.04em] after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)] after:bg-clip-text after:text-transparent after:animate-line-shadow italic tracking-tighter font-bold"
                data-text="with AI"
              >
                with AI
              </span>
            </h1>

            <p className="mb-12 text-balance text-lg text-muted-foreground tracking-tight md:text-xl">
              Track your emotions and take charge of your mental well-being
              <br className="hidden md:block" />
              <span className="hidden md:block">
                with personalized insights and AI-powered analysis
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
                href="/register"
                className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-neutral-900 hover:bg-neutral-100 hover:text-black h-11 rounded-xl px-8 sm:w-auto gap-2 whitespace-nowrap group"
              >
                Register
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-foreground h-11 rounded-xl px-8 sm:w-auto gap-2 whitespace-nowrap"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32">
            <div className="gradient -translate-x-1/2 absolute inset-0 left-1/2 h-1/4 w-3/4 animate-image-glow blur-[5rem] md:top-[10%] md:h-1/3" />
            <div className="relative -m-2 lg:-m-4 rounded-xl bg-opacity-50 p-2 ring-1 ring-foreground/20 ring-inset backdrop-blur-3xl lg:rounded-2xl overflow-hidden">
              {/* Animated Gradient Border Container */}
              <div className="[background:linear-gradient(45deg,#172033,rgba(30,41,59,1)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),rgba(71,85,105,0.48)_80%,_#ffaa40_86%,_#9c40ff_90%,_#ffaa40_94%,_rgba(71,85,105,0.48))_border-box] rounded-xl border border-transparent animate-border">
                {/* Content Container */}
                <div className="p-1 relative z-10">
                  {/* Your Existing Content */}
                  <div
                    className="absolute inset-[0] animate-shimmer-slide"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    }}
                  />

                  <img
                    alt="Dashboard Preview"
                    width="1500"
                    height="1500"
                    className="relative z-10 rounded-md bg-foreground/10 ring-1 ring-border lg:rounded-xl w-full group-hover:opacity-0 transition-opacity duration-500"
                    src="/moody-ai-bg.png"
                  />
                  <div className="-bottom-4 absolute inset-x-0 z-40 h-1/2 w-full bg-gradient-to-t from-background" />
                  <div className="md:-bottom-8 absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t from-background" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
