import { Stat } from "@chakra-ui/react";
import React from "react";
import DashboardBox from "@/features/dashboard/DashboardBox";

const StatBox = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | React.JSX.Element;
  icon?: React.JSX.Element;
}) => {
  return (
    <DashboardBox display="flex" alignItems="center">
      {icon}

      <Stat.Root>
        <Stat.Label
          textTransform="uppercase"
          fontSize="0.775rem"
          fontWeight="600"
          color="var(--color-grey-500)"
        >
          {label}
        </Stat.Label>

        <Stat.ValueText color="var(--color-grey-600)" fontWeight="500">
          {value}
        </Stat.ValueText>
      </Stat.Root>
    </DashboardBox>
  );
};

export default StatBox;
