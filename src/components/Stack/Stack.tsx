'use client';

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import "./Stack.css";

interface CardData {
  id: number;
  img: string;
  title: string;
  description: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  detailedDescription?: string;
  [key: string]: any;
}

export type { CardData };

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  onClick?: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, onClick, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: any, info: any) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  cardsData?: CardData[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  onCardClick?: (card: CardData) => void;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 300, height: 400 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  onCardClick
}: StackProps) {
  const defaultCards: CardData[] = [
    { 
      id: 1, 
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format",
      title: "Project Management App",
      description: "A full-stack project management application with real-time collaboration",
      technologies: ["React", "Node.js", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#"
    },
    { 
      id: 2, 
      img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=500&auto=format",
      title: "E-commerce Platform",
      description: "Modern e-commerce solution with payment integration",
      technologies: ["Next.js", "Stripe", "PostgreSQL"],
      demoUrl: "#",
      githubUrl: "#"
    },
    { 
      id: 3, 
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format",
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      technologies: ["React", "OpenWeather API", "CSS3"],
      demoUrl: "#",
      githubUrl: "#"
    },
    { 
      id: 4, 
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format",
      title: "Task Tracker",
      description: "Productive task management with drag-and-drop functionality",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  const [cards, setCards] = useState<CardData[]>(
    cardsData.length ? cardsData : defaultCards
  );

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  const handleCardClick = (card: CardData) => {
    if (onCardClick) {
      onCardClick(card);
    }
  };

  return (
    <div
      className="stack-container"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation
          ? Math.random() * 10 - 5
          : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            onClick={() => handleCardClick(card)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="card"
              onClick={(e) => {
                e.stopPropagation();
                if (sendToBackOnClick) {
                  sendToBack(card.id);
                } else if (onCardClick) {
                  onCardClick(card);
                }
              }}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              <div className="card-content">
                <img
                  src={card.img}
                  alt={card.title || `card-${card.id}`}
                  className="card-image"
                />
                <div className="card-overlay">
                  <div className="card-info">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                    <div className="card-technologies">
                      {card.technologies?.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
