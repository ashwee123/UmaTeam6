import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762114918584-4d161c8f1137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBjYXJuaXZhbCUyMG5pZ2h0fGVufDF8fHx8MTc3NDMyNTg1NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Horror carnival at night"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-7xl font-bold mb-6 text-red-600 drop-shadow-2xl">
              WELCOME TO YOUR NIGHTMARE
            </h1>
            <p className="text-2xl text-red-200 mb-8 drop-shadow-lg">
              The most terrifying theme park experience awaits...
            </p>
            <Link to="/tickets">
              <motion.button
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold flex items-center gap-2 mx-auto shadow-lg shadow-red-900/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GET YOUR TICKETS <ArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Floating ghosts animation */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100 
            }}
            animate={{ 
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 2,
            }}
          >
            👻
          </motion.div>
        ))}
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16 text-red-500">
            WHAT AWAITS YOU
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "5 Haunted Attractions",
              description: "Experience bone-chilling rides and walk-through horrors",
              emoji: "🎢",
            },
            {
              title: "Live Scare Actors",
              description: "Professional actors lurking around every corner",
              emoji: "🧟",
            },
            {
              title: "Midnight Specials",
              description: "Extra terrifying events on Friday nights",
              emoji: "🌙",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-b from-red-950/40 to-black border border-red-900/30 p-8 rounded-xl"
            >
              <div className="text-6xl mb-4">{feature.emoji}</div>
              <h3 className="text-2xl font-bold mb-3 text-red-400">
                {feature.title}
              </h3>
              <p className="text-red-200/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-red-950/20 border border-red-900/30 rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-red-500">
            VISITOR INFORMATION
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Clock className="text-red-500 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-red-400 mb-1">Hours</h3>
                <p className="text-red-200/70">
                  Friday - Sunday: 7:00 PM - 12:00 AM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-red-500 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-red-400 mb-1">Location</h3>
                <p className="text-red-200/70">
                  666 Haunted Lane, Shadow Valley
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
