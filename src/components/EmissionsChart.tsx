import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';

const EmissionsChart: React.FC = () => {
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('Complete');
  const [timeFilter, setTimeFilter] = useState('yearly');

  const generateTimeBasedData = (baseData: any[], timeFilter: string) => {
    switch (timeFilter) {
      case 'monthly':
        return baseData.slice(-12).map((item, index) => ({
          ...item,
          year: new Date(new Date().getFullYear(), new Date().getMonth() - 11 + index, 1)
            .toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        }));
      case 'quarterly':
        return baseData
          .filter((_, index) => index % 3 === 0)
          .slice(-8)
          .map((item, index) => ({
            ...item,
            year: `Q${(index % 4) + 1} ${Math.floor(2024 - (7 - index) / 4)}`,
          }));
      case 'yearly':
      default:
        return baseData;
    }
  };

  const baseData = {
    All: {
      Complete: [
        { value: 549, year: '2019' }, { value: 278, year: '2020' },
        { value: 875, year: '2021' }, { value: 617, year: '2022' },
        { value: 506, year: '2023' }, { value: 36, year: '2024' },
        { value: 185, year: '2025' }, { value: 191, year: '2026' },
        { value: 122, year: '2027' }, { value: 550, year: '2028' },
        { value: 881, year: '2029' }, { value: 539, year: '2030' },
        { value: 269, year: '2031' }, { value: 29, year: '2032' },
        { value: 82, year: '2033' }, { value: 44, year: '2034' },
        { value: 109, year: '2035' }, { value: 106, year: '2036' },
        { value: 607, year: '2037' }, { value: 528, year: '2038' },
      ],
      Estimate: [
        { value: 420, year: '2019' }, { value: 310, year: '2020' },
        { value: 680, year: '2021' }, { value: 520, year: '2022' },
        { value: 450, year: '2023' }, { value: 280, year: '2024' },
        { value: 320, year: '2025' }, { value: 380, year: '2026' },
        { value: 290, year: '2027' }, { value: 470, year: '2028' },
        { value: 650, year: '2029' }, { value: 410, year: '2030' },
        { value: 350, year: '2031' }, { value: 180, year: '2032' },
        { value: 220, year: '2033' }, { value: 190, year: '2034' },
        { value: 260, year: '2035' }, { value: 240, year: '2036' },
        { value: 480, year: '2037' }, { value: 420, year: '2038' },
      ],
    },
    Refurbishment: {
      Complete: [
        { value: 320, year: '2019' }, { value: 180, year: '2020' },
        { value: 450, year: '2021' }, { value: 380, year: '2022' },
        { value: 290, year: '2023' }, { value: 120, year: '2024' },
        { value: 160, year: '2025' }, { value: 140, year: '2026' },
        { value: 90, year: '2027' }, { value: 340, year: '2028' },
        { value: 520, year: '2029' }, { value: 310, year: '2030' },
        { value: 180, year: '2031' }, { value: 80, year: '2032' },
        { value: 110, year: '2033' }, { value: 95, year: '2034' },
        { value: 130, year: '2035' }, { value: 120, year: '2036' },
        { value: 350, year: '2037' }, { value: 280, year: '2038' },
      ],
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Emissions Chart</h2>
      {/* You can now use generateTimeBasedData(...) here with baseData */}
    </div>
  );
};

export default EmissionsChart;
