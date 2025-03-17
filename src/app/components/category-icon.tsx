"use client"

import { BusFront, DropletOff, LucideProps, TriangleAlert, Trees } from "lucide-react"


export type TCategory = 'Mobilidade urbana' | 'Vias e áreas públicas' | 'Saneamento básico' | 'Defesa civil'

const dictIcon: Record<TCategory, React.FC<LucideProps>> = {
  'Mobilidade urbana': BusFront,
  'Defesa civil': TriangleAlert,
  'Saneamento básico': DropletOff,
  'Vias e áreas públicas': Trees,
}

interface IconProps {
  category: TCategory;
  size?: number;
  color?: string;
}

const CategoryIcon: React.FC<IconProps> = ({ category, size, color }) => {
  const Icon = dictIcon[category];

  if (!Icon) {
    console.error(`Icon not found for group: "${category}"`);
    return null;
  }

  return <Icon size={size} color={color} />;
};

export default CategoryIcon
