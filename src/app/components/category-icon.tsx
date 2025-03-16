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
  group: TCategory;
  size?: number;
  color?: string;
}

const CategoryIcon: React.FC<IconProps> = ({ group, size, color }) => {
  const Icon = dictIcon[group];

  if (!Icon) {
    console.error(`Icon not found for group: "${group}"`);
    return null;
  }


  return <Icon size={size} color={color} />;
};

export default CategoryIcon
