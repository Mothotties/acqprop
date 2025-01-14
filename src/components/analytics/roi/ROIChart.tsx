import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ROIChartProps {
  data: Array<{
    date: string;
    actualROI: number;
    predictedROI: number;
    confidence: number;
    marketAverage: number;
  }>;
}

export function ROIChart({ data }: ROIChartProps) {
  return (
    <div className="h-[300px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            angle={-45} 
            textAnchor="end" 
            height={60}
            tick={{ fill: 'currentColor', fontSize: 12 }}
          />
          <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="actualROI" 
            stroke="#10B981" 
            fill="url(#actualGradient)"
            name="Actual Performance"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="predictedROI" 
            stroke="#6366F1" 
            fill="url(#predictedGradient)"
            name="AI Prediction"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}