import { useState } from 'react';
import { useApp } from '../../hooks/useAppState';
import { REGIONAL_ZONES, LEAD_SOURCES } from '../../data/seedData';
import { TrendingUp, Target, RefreshCw } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Growth: 'bg-blue-100 text-blue-700',
};

export default function AnalyticsView() {
  const { marketingFocus, updateMarketingFocus } = useApp();
  const [sliderVal, setSliderVal] = useState(marketingFocus.ranch);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateMarketingFocus(sliderVal);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Market Analytics & Geo-Targeting Hub</h2>
        <p className="text-gray-400 text-sm mt-1">Regional performance intelligence and marketing focus controls.</p>
      </div>

      {/* Regional Zone Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <Target size={18} className="text-forest" />
          <div>
            <h3 className="font-semibold text-charcoal">Regional Target Zones</h3>
            <p className="text-xs text-gray-400">Priority breakdown by service territory</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="table-th">Zone</th>
                <th className="table-th">Priority</th>
                <th className="table-th text-right">Leads</th>
                <th className="table-th text-right">Revenue</th>
                <th className="table-th text-right">Avg Contract</th>
                <th className="table-th">Market Penetration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {REGIONAL_ZONES.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="table-td">
                    <div className="font-medium text-charcoal">{zone.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{zone.subtext}</div>
                  </td>
                  <td className="table-td">
                    <span className={`badge ${priorityColors[zone.priority]}`}>{zone.priority}</span>
                  </td>
                  <td className="table-td text-right font-medium">{zone.leads}</td>
                  <td className="table-td text-right font-medium text-forest">{fmt(zone.revenue)}</td>
                  <td className="table-td text-right">{fmt(zone.avgContract)}</td>
                  <td className="table-td">
                    <div className="flex items-center gap-3 min-w-[140px]">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-forest to-harvest h-2 rounded-full transition-all duration-700"
                          style={{ width: `${zone.penetration}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-charcoal w-9 text-right">{zone.penetration}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Source ROI Matrix */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <TrendingUp size={18} className="text-harvest" />
          <div>
            <h3 className="font-semibold text-charcoal">Lead Source ROI Matrix</h3>
            <p className="text-xs text-gray-400">Spend vs. revenue by acquisition channel</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="table-th">Source</th>
                <th className="table-th text-right">Leads</th>
                <th className="table-th text-right">Conv. Rate</th>
                <th className="table-th text-right">Ad Spend</th>
                <th className="table-th text-right">Revenue</th>
                <th className="table-th text-right">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {LEAD_SOURCES.map(src => {
                const roi = src.spend > 0 ? Math.round((src.revenue / src.spend) * 100) / 100 : '∞';
                return (
                  <tr key={src.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="table-td font-medium">{src.name}</td>
                    <td className="table-td text-right">{src.leads}</td>
                    <td className="table-td text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div className="bg-forest h-1.5 rounded-full" style={{ width: `${src.convRate}%` }} />
                        </div>
                        <span className="text-xs font-medium">{src.convRate}%</span>
                      </div>
                    </td>
                    <td className="table-td text-right text-gray-500">{src.spend > 0 ? fmt(src.spend) : '—'}</td>
                    <td className="table-td text-right font-semibold text-forest">{fmt(src.revenue)}</td>
                    <td className="table-td text-right">
                      <span className={`badge ${roi === '∞' || Number(roi) > 10 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {roi === '∞' ? '∞ Organic' : `${roi}x`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Targeting Parameter Controller */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <RefreshCw size={18} className="text-blue-500" />
          <div>
            <h3 className="font-semibold text-charcoal">Targeting Parameter Controller</h3>
            <p className="text-xs text-gray-400">Adjust marketing campaign allocation focus</p>
          </div>
        </div>
        <div className="p-6 max-w-xl">
          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span className="text-charcoal">Residential Maintenance</span>
              <span className="text-charcoal">Agricultural & Land Prep</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>{100 - sliderVal}%</span>
              <span>{sliderVal}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderVal}
              onChange={e => setSliderVal(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1B4332 0%, #1B4332 ${sliderVal}%, #C5A059 ${sliderVal}%, #C5A059 100%)`
              }}
            />
            <div className="flex justify-between mt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-sm bg-forest inline-block" />
                <span className="text-gray-500">Residential Focus ({100 - sliderVal}%)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-sm bg-harvest inline-block" />
                <span className="text-gray-500">Ranch & Fire Focus ({sliderVal}%)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-forest/5 rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Residential</div>
              <div className="text-2xl font-bold text-forest font-serif">{100 - sliderVal}%</div>
              <div className="text-xs text-gray-400 mt-1">Irrigation, fencing, cleanup, drainage</div>
            </div>
            <div className="bg-harvest/5 rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Ag / Land Prep</div>
              <div className="text-2xl font-bold text-harvest font-serif">{sliderVal}%</div>
              <div className="text-xs text-gray-400 mt-1">Grading, lot clearing, acreage work</div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`btn-primary text-sm ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {saved ? '✓ Parameters Saved' : 'Apply Target Parameters'}
          </button>
        </div>
      </div>
    </div>
  );
}
