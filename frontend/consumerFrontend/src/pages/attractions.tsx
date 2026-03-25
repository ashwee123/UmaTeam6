import { motion } from "framer-motion";
import { Clock, Skull, AlertTriangle } from "lucide-react";

interface Attraction {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  intensity: "Extreme" | "High" | "Medium";
  icon: string;
}

const attractions: Attraction[] = [
  {
    id: 1,
    title: "The Haunted Manor",
    description: "Navigate through a Victorian mansion filled with restless spirits and supernatural horrors. Every room holds a new nightmare.",
    image: "https://images.unsplash.com/photo-1621940378815-230a01576c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXVudGVkJTIwaG91c2UlMjBzY2FyeXxlbnwxfHx8fDE3NzQzMjU4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "15 min",
    intensity: "High",
    icon: "🏚️",
  },
  {
    id: 2,
    title: "Circus of Terror",
    description: "Step right up to witness the most disturbing circus acts. Twisted clowns and demented performers await.",
    image: "https://images.unsplash.com/photo-1711234186228-1e08cfcd0c5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVlcHklMjBjbG93biUyMGRhcmt8ZW58MXx8fHwxNzc0MzI1ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "20 min",
    intensity: "Extreme",
    icon: "🎪",
  },
  {
    id: 3,
    title: "Scream Coaster",
    description: "A high-speed rollercoaster through total darkness with unexpected scares at every turn. Hold on tight!",
    image: "https://images.unsplash.com/photo-1760783320562-c52202fcb632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FyeSUyMHJvbGxlcmNvYXN0ZXIlMjBuaWdodHxlbnwxfHx8fDE3NzQzMjU4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "5 min",
    intensity: "Extreme",
    icon: "🎢",
  },
  {
    id: 4,
    title: "Zombie Apocalypse",
    description: "Survive a post-apocalyptic world overrun by the undead. Armed with only a flashlight, can you make it out alive?",
    image: "https://images.unsplash.com/photo-1679590060902-3556e64a676f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b21iaWUlMjBhcG9jYWx5cHNlfGVufDF8fHx8MTc3NDMwMTQwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "25 min",
    intensity: "Extreme",
    icon: "🧟‍♂️",
  },
  {
    id: 5,
    title: "Witch's Forest",
    description: "Follow the trail through an enchanted forest where ancient curses come to life. Beware the witch's wrath.",
    image: "https://images.unsplash.com/photo-1636894290355-e05f59eb8f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZm9yZXN0JTIwZm9nfGVufDF8fHx8MTc3NDMyNTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "18 min",
    intensity: "Medium",
    icon: "🌲",
  },
];

export default function Attractions() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-bold mb-4 text-red-600">
          FACE YOUR FEARS
        </h1>
        <p className="text-xl text-red-200/70">
          Choose your nightmare... if you dare
        </p>
      </motion.div>

      {/* Warning Banner */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-red-900/30 border-2 border-red-600 rounded-lg p-4 mb-12 flex items-center gap-3"
      >
        <AlertTriangle className="text-red-500" size={32} />
        <div>
          <h3 className="font-bold text-red-400">EXTREME INTENSITY WARNING</h3>
          <p className="text-red-200/70">
            All attractions contain intense scares, loud noises, strobe lights, and fog effects.
          </p>
        </div>
      </motion.div>

      {/* Attractions Grid */}
      <div className="space-y-8">
        {attractions.map((attraction, index) => (
          <motion.div
            key={attraction.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-xl border border-red-900/30 bg-black/40"
          >
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Image */}
              <div className="relative h-64 md:h-auto overflow-hidden rounded-lg">
                <img
                  src={attraction.image}
                  alt={attraction.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 text-6xl">
                  {attraction.icon}
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${
                  attraction.intensity === "Extreme" 
                    ? "bg-red-600 text-white" 
                    : attraction.intensity === "High"
                    ? "bg-orange-600 text-white"
                    : "bg-yellow-600 text-black"
                }`}>
                  {attraction.intensity}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-4 text-red-500">
                  {attraction.title}
                </h2>
                <p className="text-red-200/80 mb-6 text-lg">
                  {attraction.description}
                </p>
                
                <div className="flex items-center gap-6 text-red-300">
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{attraction.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skull size={20} />
                    <span>{attraction.intensity} Scares</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold w-fit"
                >
                  BOOK THIS ATTRACTION
                </motion.button>
              </div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
