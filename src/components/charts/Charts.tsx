import React from 'react';
import ReactECharts from 'echarts-for-react';

interface ChartProps {
  data: { name: string; count: string }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const option = {
    title: {
      text: 'Users According to Department',
      subtext: '',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Users',
        type: 'pie',
        radius: '50%',
        data: data.map((item) => ({
          name: item.name,
          value: item.count,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default Chart;
