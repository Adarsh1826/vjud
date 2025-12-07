"use client";

import { ProblemUri } from "@/types";
import { useEffect, useState } from "react";

export default function PageDataFetch({ uri }: ProblemUri) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uri) return;

    const fetchData = async () => {
      setLoading(true);

      const res = await fetch("/api/scrapper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: uri }),
      });

      const result = await res.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [uri]);

  return (
    <div>
      <div><b>URL:</b> {uri}</div>

      {loading && <p>Loading...</p>}

      {data && (
        <pre className="mt-4 bg-gray-100 p-3 rounded text-amber-500">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
