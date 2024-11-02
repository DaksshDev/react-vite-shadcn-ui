// src/components/ToolCard.tsx
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  name: string;
  description: string;
  link: string;
}

export const ToolCard = ({ name, description, link }: ToolCardProps) => {
  return (
    <Link to={link} className="p-4 w-64 bg-card shadow-md rounded-lg flex flex-col items-start shadow-blue-600">
      <Badge variant="outline" className="mb-2">{name}</Badge>
      <p className="text-sm">{description}</p>
    </Link>
  );
};
