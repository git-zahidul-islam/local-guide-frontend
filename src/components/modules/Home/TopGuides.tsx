"use client";

import React, { useState, useEffect } from "react";
import { Star, MapPin, Languages } from "lucide-react";
import { getPopularGuides } from "@/services/listing/listing.service";

export function TopGuides() {
  type Guide = {
    _id: string;
    name: string;
    profilePicture: string;
    languages: string[];
    expertise: string[];
  };

  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopGuides = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiGuides = await getPopularGuides();
        
        // Transform API data or use default image if profilePicture is empty
        const transformedGuides = apiGuides.map((guide: any) => ({
          ...guide,
          profilePicture: guide.profilePicture || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80"
        }));

        setGuides(transformedGuides);
      } catch (err: any) {
        console.error("Error fetching guides:", err);
        setError(err.message);
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopGuides();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top-Rated Local Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading guides...
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top-Rated Local Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our most experienced and beloved guides
          </p>

          {error && (
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg">
              <span className="text-sm">Showing demo data</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide: any, index) => (
            <div
              key={guide._id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={guide.profilePicture}
                  alt={guide.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {guide.name}
                </h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <Languages className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {Array.isArray(guide.languages)
                      ? guide.languages.join(", ")
                      : "English"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {guide.expertise?.map((skill: string, idx: number) => (
                    <span key={idx} className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
