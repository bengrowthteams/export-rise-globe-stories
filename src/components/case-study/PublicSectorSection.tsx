
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
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Policy Framework</h3>
            <p className="text-gray-700 leading-relaxed">
              {publicSectorPolicy}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Key Actors</h3>
            <p className="text-gray-700 leading-relaxed">
              {publicSectorActor}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicSectorSection;
