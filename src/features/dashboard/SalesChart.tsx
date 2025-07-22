import Heading from "@/components/Heading";
import { BookingsPricesType } from "../../types/bookingsTypes";
import { getToday } from "@/utils/helper";
import { subDays, isSameDay, eachDayOfInterval, format } from "date-fns";
import { formatDateToReadable } from "../../utils/helper";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardBox from "../../components/SectionBox";
import { useTheme } from "@/context/ThemeContext";

const SalesChart = ({
  bookingsPrices,
  numDays,
}: {
  bookingsPrices: BookingsPricesType[];
  numDays: number;
}) => {
  const { theme } = useTheme();

  const startDate = formatDateToReadable(
    String(subDays(getToday(), Number(numDays) - 1)),
  );
  const endDate = formatDateToReadable(getToday());

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), Number(numDays) - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookingsPrices
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extraSales: bookingsPrices
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });

  const colors =
    theme === "dark"
      ? {
          extraSales: { stroke: "#4f46e5", fill: "#4f46e5" },
          totalSales: { stroke: "#22c55e", fill: "#22c55e" },
          text: "#e5e7eb",
          background: "#18212f",
        }
      : {
          extraSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
          totalSales: { stroke: "#16a34a", fill: "#dcfce7" },
          text: "#374151",
          background: "#fff",
        };

  return (
    <DashboardBox padding="6" gridColumn="1 / -1">
      <Heading as="h3" fontSize="xl" marginBottom="8">
        Sales from {startDate} - {endDate}
      </Heading>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, left: 32, bottom: 50 }}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stackId="1"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={1.5}
            unit="$"
            name="Total sales"
          />
          <Area
            type="monotone"
            dataKey="extraSales"
            stackId="2"
            stroke={colors.extraSales.stroke}
            fill={colors.extraSales.fill}
            strokeWidth={1.5}
            unit="$"
            name="Extra sales"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-grey-0)",
              borderColor: "var(--color-grey-200)",
              borderRadius: "var(--chakra-radii-md)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default SalesChart;
