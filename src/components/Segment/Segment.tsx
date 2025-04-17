import styles from "./Segment.module.scss";

import { SegmentGroup } from "@chakra-ui/react";

type SegmentItems =
  | {
      label: string;
      value: string;
    }
  | string;

const Segment = ({
  items,
  value,
  setValue,
}: {
  items: SegmentItems[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <SegmentGroup.Root
      value={value}
      onValueChange={(e) => setValue(e.value)}
      bgColor="var(--color-grey-0)"
      shadow="var(--shadow-sm)"
      size="md"
    >
      <SegmentGroup.Indicator
        color="var(--color-grey-0)"
        bgColor="var(--color-brand-600)"
      />
      <SegmentGroup.Items
        items={items}
        color="var(--color-grey-700)"
        fontWeight="500"
        className={styles.segmentItems}
      />
    </SegmentGroup.Root>
  );
};

export default Segment;
