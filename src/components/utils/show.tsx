import { ReactNode } from "react";

interface ConditionalRenderProps {
  when: boolean;
  render: ReactNode;
  fallback?: ReactNode;
}

export const Show = ({ when, render, fallback = null }: ConditionalRenderProps) => {
  return when ? render : fallback;
};
