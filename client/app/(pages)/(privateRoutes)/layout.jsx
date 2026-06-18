"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PrivateLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get(`${base_url}/user/validate-token`, {
          headers: {
            Authorization: token,
          },
        });

        if (res.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070709]">
        <div className="relative flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500/10 border-t-purple-500" />
          <p className="text-[11px] tracking-widest text-zinc-500 font-medium uppercase animate-pulse">
            Verifying Session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}