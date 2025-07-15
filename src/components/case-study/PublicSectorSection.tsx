
import React from 'react';
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PublicSectorSectionProps {
  publicSectorActor: string;
  publicSectorPolicy: string;
}

const PublicSectorSection = ({ publicSectorActor, publicSectorPolicy }: PublicSectorSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="text-blue-600" size={24} />
          <span>Public Sector Policy & Actors</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-4">Policy Framework</h3>
        <p className="text-gray-700 mb-6">
          {publicSectorPolicy || 'Public sector policy information not available.'}
        </p>

        <h3 className="text-xl font-semibold mb-4">Key Actors</h3>
        <p className="text-gray-700">
          {publicSectorActor || 'Public sector actor information not available.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default PublicSectorSection;
