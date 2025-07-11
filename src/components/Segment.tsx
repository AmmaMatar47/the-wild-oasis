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
  onValueChange,
}: {
  items: SegmentItems[];
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <SegmentGroup.Root
      value={value}
      onValueChange={(e) => onValueChange(e.value ?? "")}
      bgColor="var(--color-grey-0)"
      shadow="var(--shadow-sm)"
    >
      <SegmentGroup.Indicator bgColor="var(--color-brand-600)" />
      <SegmentGroup.Items
        items={items}
        fontWeight="500"
        color="var(--color-grey-800)"
        _checked={{ color: "#fff" }}
      />
    </SegmentGroup.Root>
  );
};

export default Segment;
