import { useApp } from '../hooks/useAppState';
import { FolderOpen, DollarSign, TrendingUp, MapPin } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function KPIRibbon() {
  const { kpis } = useApp();

  const cards = [
    {
      label: 'Active Projects',
      value: kpis.activeProjects,
      icon: <FolderOpen size={20} className="text-forest" />,
      bg: 'bg-forest/5',
      sub: 'Currently in field',
    },
    {
      label: 'Open Pipeline Value',
      value: fmt(kpis.openPipeline),
      icon: <DollarSign size={20} className="text-harvest" />,
      bg: 'bg-harvest/5',
      sub: 'Unconverted leads',
    },
    {
      label: 'Average Job Size',
      value: fmt(kpis.avgJobSize),
      icon: <TrendingUp size={20} className="text-blue-500" />,
      bg: 'bg-blue-50',
      sub: 'Across all projects',
    },
    {
      label: 'Top Regional Zone',
      value: kpis.topZone,
      icon: <MapPin size={20} className="text-purple-500" />,
      bg: 'bg-purple-50',
      sub: 'By lead volume & value',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
      {cards.map(card => (
        <div key={card.label} className="stat-card">
          <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-2`}>
            {card.icon}
          </div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{card.label}</div>
          <div className="text-xl font-bold text-charcoal font-serif leading-tight">{card.value}</div>
          <div className="text-xs text-gray-400">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
