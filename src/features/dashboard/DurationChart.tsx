import Heading from "@/components/Heading";
import {
  PieChart,
  Legend,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import SectionBox from "../../components/SectionBox";
import { ConfirmedBookingsType } from "../../types/bookingsTypes";
import { EmptyState } from "@chakra-ui/react";
import { useSearchParams } from "react-router";
import { useTheme } from "../../context/ThemeContext";

interface StartDateType {
  duration: string;
  value: number;
  color: string;
}

// I did this technique because recharts don't support css variables
const startDataTheme = (theme: "dark" | "light") => [
  {
    duration: "1 night",
    value: 0,
    color: `var(--chakra-colors-blue-${theme === "light" ? "400" : "600"})`,
  },
  {
    duration: "2 nights",
    value: 0,
    color: `var(--chakra-colors-green-${theme === "light" ? "400" : "600"})`,
  },
  {
    duration: "3 nights",
    value: 0,
    color: `var(--chakra-colors-red-${theme === "light" ? "400" : "600"})`,
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: `var(--chakra-colors-yellow-${theme === "light" ? "400" : "600"})`,
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: `var(--chakra-colors-cyan-${theme === "light" ? "400" : "600"})`,
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: `var(--chakra-colors-orange-${theme === "light" ? "400" : "600"})`,
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: `var(--chakra-colors-teal-${theme === "light" ? "400" : "600"})`,
  },
  {
    duration: "21+ nights",
    value: 0,
    color: `var(--chakra-colors-purple-${theme === "light" ? "400" : "600"})`,
  },
];

const prepareData = (
  startData: StartDateType[],
  stays: ConfirmedBookingsType[],
) => {
  const incArrayValue = (arr: StartDateType[], field: string) =>
    arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
};

const DurationChart = ({
  confirmedStays,
}: {
  confirmedStays: ConfirmedBookingsType[];
}) => {
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();

  const startData = startDataTheme(theme);
  const data = prepareData(startData, confirmedStays);
  const date = searchParams.get("last");

  return (
    <SectionBox
      display="flex"
      flexDirection="column"
      padding="6"
      gridColumn="3 / -1"
      gap="8"
    >
      <Heading as="h3" fontSize="xl">
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
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              dataKey="value"
              innerRadius={85}
              outerRadius={110}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>

            <Tooltip
              itemStyle={{
                color: "var(--color-grey-800)",
              }}
              contentStyle={{
                backgroundColor: "var(--color-grey-0)",
                borderColor: "var(--color-grey-200)",
                borderRadius: "var(--chakra-radii-md)",
              }}
            />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </SectionBox>
  );
};

export default DurationChart;
