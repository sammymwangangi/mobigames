"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Buggy from "@/images/buggy.png";
import axios from "axios";
import { ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

// Define types for Game and GameCategory
interface Game {
  id: string; // Replaced with new field
  name: string; // Replaced title with name
  image: string; // Replaced thumbnail with image
  description: string; // Replaced short_description with description
  game_url: string; // Retained field
  genre: string; // Retained field
  platform: string; // Retained field
  publisher: string; // Replaced developer with publisher
  developer: string; // Replaced publisher with developer
  year_of_release: string; // Replaced release_date with year_of_release
  freetogame_profile_url: string; // Retained field
  createdAt: string; // New field
  categoryId: string; // New field
  image_url: string; // New field
  rating: number; // New field
  technology: string; // New field
}

interface GameCategory {
  [key: string]: Game[];
}

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={game.image}
        alt={game.name}
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src="https://youtu.be/eEzD-Y97ges" type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
            <p className="text-white text-lg font-bold">{game.name}</p>
          </div>
        </>
      )}
    </div>
  );
};

const GameSection: React.FC<{
  title: string;
  games: Game[];
  viewMoreLink: string;
}> = ({ title, games, viewMoreLink }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: string) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-start gap-4 items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Link
          href={viewMoreLink}
          className="text-purple-400 hover:text-purple-300"
        >
          View more
        </Link>
      </div>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
        <Button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

const PlaceholderContent: React.FC = () => {
  const [games, setGames] = useState<GameCategory>({});
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          "https://66d6808a006bfbe2e64d9723.mockapi.io/api/v1/games"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const games: Game[] = await response.json();

        // Group games by genre
        const categorizedGames = games.reduce(
          (acc: GameCategory, game: Game) => {
            if (!acc[game.genre]) acc[game.genre] = [];
            acc[game.genre].push(game);
            return acc;
          },
          {}
        );

        // Use categorizedGames for further processing or state management
        console.log(categorizedGames); // For debugging purposes
        // Replace this with your actual state management logic, e.g., setGames(categorizedGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {isLoaded ? (
        isSignedIn ? (
          <div>Hello {user?.firstName}</div> // Display user's first name if signed in
        ) : (
          <div>Not signed in</div> // If user is not signed in
        )
      ) : (
        <div>Loading...</div> // Loading state
      )}
      
      <h1 className="text-3xl text-white font-bold">New games</h1>

      {/* Games grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 mt-4">
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-300 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">UPDATED</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">HOT</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>

        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-300 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">UPDATED</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">HOT</div>
          </div>
        </Link>
      </div>

      <div className="flex space-x-6 items-center mt-4 mb-4">
        <div className="text-xl text-white font-bold">.io Games</div>
        <Link href="#" className="text-sm text-blue-400 font-bold">
          View more
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4 mb-4">
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-300 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs text-black">TOP RATED</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">HOT</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
      </div>

      <div className="flex space-x-6 items-center mt-4 mb-4">
        <div className="text-xl text-white font-bold">Casual Games</div>
        <Link href="#" className="text-sm text-blue-400 font-bold">
          View more
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4 mb-4">
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-300 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs text-black">TOP RATED</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">HOT</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
      </div>

      <div className="flex space-x-6 items-center mt-4 mb-4">
        <div className="text-xl text-white font-bold">Driving Games</div>
        <Link href="#" className="text-sm text-blue-400 font-bold">
          View more
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4 mb-4">
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-300 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs text-black">TOP RATED</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">HOT</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
        <Link
          href="/dashboard/game-details"
          className="p-0 rounded-lg h-32 bg-white relative"
        >
          <Image
            src={Buggy}
            alt="game image"
            className="object-cover h-32 rounded-lg"
          />
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-400 absolute top-0 left-0 rounded-lg">
            <div className="font-bold text-xs">NEW</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PlaceholderContent;
