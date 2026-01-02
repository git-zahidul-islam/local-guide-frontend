"use client";

import { useState } from "react";

interface ListingDescriptionProps {
  description: string;
}

export default function ListingDescription({
  description,
}: ListingDescriptionProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        About This Tour
      </h3>
      <div className="prose prose-secondary max-w-none">
        <p
          className={`text-gray-700 ${!showFullDescription && "line-clamp-4"}`}
        >
          {description}
        </p>
        {description.length > 300 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 text-secondary hover:text-secondary/80 font-medium"
          >
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
