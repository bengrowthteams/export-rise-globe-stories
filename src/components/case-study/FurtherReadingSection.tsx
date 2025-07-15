
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FurtherReadingSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Further Reading</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-gray-700">
          <p><strong>Nadvi, K. & Thoburn, J. (2004).</strong> "Vietnam in the global garment and textile value chain: impacts on firms and workers." <em>Journal of International Development, 16</em>(1), 111-123.</p>
          <p><strong>Tran, A.N. (2013).</strong> "Ties that bind: Cultural identity and the political economy of Vietnam's textile and garment industry." <em>Southeast Asian Studies, 51</em>(2), 259-285.</p>
          <p><strong>World Bank (2020).</strong> "Vietnam's Manufacturing Miracle: Lessons for Developing Countries." <em>World Bank Group Policy Research Working Paper.</em></p>
          <p><strong>UNCTAD (2019).</strong> "Foreign Direct Investment and Industrial Upgrading in Vietnam's Textile Sector." <em>United Nations Conference on Trade and Development.</em></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FurtherReadingSection;
