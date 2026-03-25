import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Calendar, Users, Skull } from "lucide-react";

interface TicketType {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  icon: string;
}

const ticketTypes: TicketType[] = [
  {
    id: "general",
    name: "General Admission",
    price: 49,
    icon: "🎃",
    features: [
      "Access to all 5 attractions",
      "Standard entry queue",
      "Valid for one night",
      "Parking included",
    ],
  },
  {
    id: "fast-pass",
    name: "Fast Pass",
    price: 79,
    icon: "⚡",
    popular: true,
    features: [
      "Everything in General Admission",
      "Skip the line access",
      "Priority seating on rides",
      "Free photo download",
      "Commemorative lanyard",
    ],
  },
  {
    id: "vip",
    name: "VIP Experience",
    price: 129,
    icon: "👑",
    features: [
      "Everything in Fast Pass",
      "Behind-the-scenes tour",
      "Meet the scare actors",
      "VIP lounge access",
      "Exclusive merchandise",
      "Complimentary refreshments",
    ],
  },
];

export default function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState<string>("fast-pass");
  const [quantity, setQuantity] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");

  const selectedTicketType = ticketTypes.find((t) => t.id === selectedTicket);
  const totalPrice = selectedTicketType ? selectedTicketType.price * quantity : 0;

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-bold mb-4 text-red-600">
          DARE TO ENTER?
        </h1>
        <p className="text-xl text-red-200/70">
          Select your ticket and prepare for terror
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {ticketTypes.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedTicket(ticket.id)}
            className={`relative cursor-pointer rounded-xl p-8 transition-all ${
              selectedTicket === ticket.id
                ? "bg-gradient-to-b from-red-900/60 to-red-950/60 border-2 border-red-600 shadow-lg shadow-red-900/50"
                : "bg-gradient-to-b from-red-950/40 to-black border border-red-900/30 hover:border-red-700/50"
            }`}
          >
            {ticket.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
            )}

            <div className="text-6xl mb-4">{ticket.icon}</div>
            
            <h3 className="text-2xl font-bold mb-2 text-red-400">
              {ticket.name}
            </h3>
            
            <div className="mb-6">
              <span className="text-5xl font-bold text-red-500">
                ${ticket.price}
              </span>
              <span className="text-red-300/70"> / person</span>
            </div>

            <ul className="space-y-3 mb-6">
              {ticket.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-red-200/80">
                  <Check className="text-red-500 flex-shrink-0 mt-1" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {selectedTicket === ticket.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
              >
                <Check className="text-white" size={18} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Booking Form */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto bg-gradient-to-b from-red-950/40 to-black border border-red-900/30 rounded-xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-red-500">
          Complete Your Booking
        </h2>

        <div className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="flex items-center gap-2 text-red-300 mb-2 font-bold">
              <Calendar size={20} />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-black/50 border border-red-900/50 rounded-lg px-4 py-3 text-red-100 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Quantity Selection */}
          <div>
            <label className="flex items-center gap-2 text-red-300 mb-2 font-bold">
              <Users size={20} />
              Number of Tickets
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-red-900/50 hover:bg-red-900 rounded-lg text-red-100 font-bold text-xl"
              >
                -
              </button>
              <span className="text-3xl font-bold text-red-400 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-12 h-12 bg-red-900/50 hover:bg-red-900 rounded-lg text-red-100 font-bold text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="bg-black/50 rounded-lg p-6 border border-red-900/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-300">Ticket Type:</span>
              <span className="text-red-100 font-bold">
                {selectedTicketType?.name}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-300">Quantity:</span>
              <span className="text-red-100 font-bold">{quantity}</span>
            </div>
            <div className="h-px bg-red-900/30 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-xl text-red-300">Total:</span>
              <span className="text-4xl font-bold text-red-500">
                ${totalPrice}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-2 shadow-lg shadow-red-900/50"
          >
            <Skull size={24} />
            BOOK YOUR NIGHTMARE
          </motion.button>

          <p className="text-center text-red-400/60 text-sm">
            ⚠️ All sales are final. No refunds for early exits due to fear.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
