'use client';

import { GET_USER_TYPE_ANALYTICS } from '@/lib/api-constants';
import { API } from '@/services';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

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
  const [data, setData] = useState<any>([]);

  const getUserTypeAnalytics = async () => {
    const res = await API.get(GET_USER_TYPE_ANALYTICS);

    if (res.status === 200) {
      setData(res.data);
    }
  };

  useEffect(() => {
    getUserTypeAnalytics();
  }, []);

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
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} className="" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl p-2">
        {data.map((entry: any, index: number) => (
          <span key={index}>
            <span
              className="mr-1 inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}({entry.value})
          </span>
        ))}
      </div>
    </>
  );
};

export default UserStatistics;
