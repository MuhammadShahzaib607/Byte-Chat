"use client";

export default function LoginPageSkeleton() {
  return (
    <div className="w-full max-w-[480px] rounded-2xl border border-zinc-800 bg-[#0d0d11]/80 backdrop-blur-md p-10 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
      {/* Header Skeleton */}
      <div className="space-y-3 mb-8">
        <div className="h-7 w-20 bg-zinc-800 rounded animate-pulse" />
        <div className="h-4 w-56 bg-zinc-800 rounded animate-pulse" />
      </div>

      {/* Input Group 1 */}
      <div className="space-y-3 mb-6">
        <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
        <div className="h-12 w-full bg-zinc-800 rounded-xl animate-pulse" />
      </div>

      {/* Input Group 2 */}
      <div className="space-y-3 mb-8">
        <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
        <div className="h-12 w-full bg-zinc-800 rounded-xl animate-pulse" />
      </div>

      {/* Button Skeleton */}
      <div className="h-12 w-full bg-zinc-800 rounded-xl animate-pulse mb-6" />

      {/* Footer Skeleton */}
      <div className="flex justify-center">
        <div className="h-4 w-40 bg-zinc-800 rounded animate-pulse" />
      </div>
    </div>
  );
}