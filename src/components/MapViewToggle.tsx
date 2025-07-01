
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Map } from 'lucide-react';

interface MapViewToggleProps {
  is3D: boolean;
  onToggle: (is3D: boolean) => void;
}

const MapViewToggle: React.FC<MapViewToggleProps> = ({ is3D, onToggle }) => {
  return (
    <Button
      onClick={() => onToggle(!is3D)}
      variant="outline"
      size="sm"
      className="bg-white/90 hover:bg-white flex items-center gap-2"
      title={is3D ? "Switch to 2D Map" : "Switch to 3D Globe"}
    >
      {is3D ? (
        <>
          <Map size={16} />
          2D
        </>
      ) : (
        <>
          <Globe size={16} />
          3D
        </>
      )}
    </Button>
  );
};

export default MapViewToggle;
