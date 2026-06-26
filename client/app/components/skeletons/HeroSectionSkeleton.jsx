"use client";

export default function HeroSectionSkeleton() {
  return (
    <section className="px-6 py-24 sm:py-36 text-center w-full max-w-4xl mx-auto">
      {/* Badge Skeleton */}
      <div className="h-6 w-52 bg-zinc-800 rounded-full mx-auto mb-8 animate-pulse" />
      
      {/* Heading Skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-12 sm:h-20 w-3/4 mx-auto bg-zinc-800 rounded-lg animate-pulse" />
        <div className="h-12 sm:h-20 w-1/2 mx-auto bg-zinc-800 rounded-lg animate-pulse" />
      </div>
      
      {/* Paragraph Skeleton */}
      <div className="space-y-3 mb-10">
        <div className="h-4 w-full max-w-md mx-auto bg-zinc-800 rounded animate-pulse" />
        <div className="h-4 w-3/4 max-w-sm mx-auto bg-zinc-800 rounded animate-pulse" />
      </div>
      
      {/* Button Skeleton */}
      <div className="h-12 w-48 mx-auto bg-zinc-800 rounded-xl animate-pulse" />
    </section>
  );
}