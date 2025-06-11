import Heading from '@/components/Heading';
import { PieChart, Legend, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DashboardBox from './DashboardBox';
import { ConfirmedBookingsType } from '@/services/api/bookingsApi';
import { EmptyState } from '@chakra-ui/react';
import { useSearchParams } from 'react-router';

interface StartDateType {
  duration: string;
  value: number;
  color: string;
}

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#FF6B6B',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#4ECDC4',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#FFD166',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#A78AFF',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#06D6A0',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#EF476F',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#FF9A76',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#118AB2',
  },
];

const prepareData = (startData: StartDateType[], stays: ConfirmedBookingsType[]) => {
  const incArrayValue = (arr: StartDateType[], field: string) =>
    arr.map(obj => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter(obj => obj.value > 0);

  return data;
};

const DurationChart = ({ confirmedStays }: { confirmedStays: ConfirmedBookingsType[] }) => {
  const [searchParams] = useSearchParams();

  const startData = startDataLight;
  const data = prepareData(startData, confirmedStays);
  const date = searchParams.get('last');

  return (
    <DashboardBox display='flex' flexDirection='column' padding='6' gridColumn='3 / -1' gap='8'>
      <Heading as='h3' fontSize='xl'>
        Stay duration summary
      </Heading>

      {confirmedStays === undefined ? (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Description>
              No stays recorded in the past {date} days.
            </EmptyState.Description>
          </EmptyState.Content>
        </EmptyState.Root>
      ) : (
        <ResponsiveContainer width='100%' height={240}>
          <PieChart>
            <Pie
              data={data}
              nameKey='duration'
              dataKey='value'
              innerRadius={85}
              outerRadius={110}
              cx='40%'
              cy='50%'
              paddingAngle={3}
            >
              {data.map(entry => (
                <Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
              ))}
            </Pie>

            <Tooltip />
            <Legend
              verticalAlign='middle'
              align='right'
              layout='vertical'
              iconSize={15}
              iconType='circle'
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </DashboardBox>
  );
};

export default DurationChart;
