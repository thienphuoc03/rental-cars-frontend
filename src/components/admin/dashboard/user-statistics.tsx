'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Admin',
    color: '#FFBB28',
    value: 2,
  },
  {
    name: 'Car Owner',
    color: '#0088FE',
    value: 60,
  },
  {
    name: 'Traveler',
    color: '#00C49F',
    value: 38,
  },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const UserStatistics = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} className="" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl p-2">
        {data.map((entry, index) => (
          <span key={index}>
            <span
              className="mr-1 inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}: {entry.value} người
          </span>
        ))}
      </div>
    </>
  );
};

export default UserStatistics;
