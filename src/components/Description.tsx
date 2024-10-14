"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function GameDetails() {
  const { setTheme, theme } = useTheme();
  const { isSignedIn, user } = useUser();
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="px-20">
        <div className="relative h-[500px] bg-gray-700 flex flex-col items-center justify-center">
          <div className="absolute inset-x-0 top-0 py-2 flex items-center justify-center bg-blue-950 w-full">
            {isSignedIn ? (
              <div className="flex gap-1">
                <h1 className="text-white">
                  Your progress will be saved on your account!
                </h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer text-white"
                    onClick={() => setIsOpen(true)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>

                  <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="relative z-50"
                  >
                    <div className="fixed inset-0 flex w-screen items-center justify-center text-center p-4">
                      <DialogPanel className="max-w-lg space-y-4 border bg-white text-black dark:text-white dark:bg-indigo-950 p-12 rounded">
                        <DialogTitle className="text-2xl font-bold">
                          Your progress will be saved on your MobiGames account
                        </DialogTitle>
                        <Description className="text-xs">
                          You're currently logged in to your MobiGames account,
                          which means that your progress will be saved on that
                          account as you play. Logging in to MobiGames before
                          playing ensures the convenience of continuing your
                          game on any device.
                        </Description>
                        <div className="flex gap-4 justify-center">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full bg-indigo-600 px-6 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Got it!
                          </button>
                        </div>
                      </DialogPanel>
                    </div>
                  </Dialog>
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div>Don&#39;t Lose your progress</div>
                <div>
                  <button
                    type="button"
                    className="rounded-full bg-indigo-700 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-36 w-56 bg-blue-700 rounded-xl"></div>
          <div className="text-3xl mt-2 mb-2">
            Free Kick Classic (3D Free Kick)
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Play Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 -mr-0.5 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-0 py-2 flex items-center justify-center bg-gray-800 w-full">
            {isSignedIn ? (
              <div className="flex gap-1">
                <h1 className="text-white">
                  Your progress will be saved on your account!
                </h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer text-white"
                    onClick={() => setIsOpen(true)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>

                  <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="relative z-50"
                  >
                    <div className="fixed inset-0 flex w-screen items-center justify-center text-center p-4">
                      <DialogPanel className="max-w-lg space-y-4 border bg-white text-black dark:text-white dark:bg-indigo-950 p-12 rounded">
                        <DialogTitle className="text-2xl font-bold">
                          Your progress will be saved on your MobiGames account
                        </DialogTitle>
                        <Description className="text-xs">
                          You&#39;re currently logged in to your MobiGames account,
                          which means that your progress will be saved on that
                          account as you play. Logging in to MobiGames before
                          playing ensures the convenience of continuing your
                          game on any device.
                        </Description>
                        <div className="flex gap-4 justify-center">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full bg-indigo-600 px-6 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Got it!
                          </button>
                        </div>
                      </DialogPanel>
                    </div>
                  </Dialog>
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div>Don&#39;t Lose your progress</div>
                <div>
                  <button
                    type="button"
                    className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
