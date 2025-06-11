import styles from './Segment.module.scss';
import { SegmentGroup } from '@chakra-ui/react';

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
      onValueChange={e => onValueChange(e.value)}
      bgColor='var(--color-grey-0)'
      shadow='var(--shadow-sm)'
    >
      <SegmentGroup.Indicator bgColor='var(--color-brand-500)' />
      <SegmentGroup.Items items={items} fontWeight='500' className={styles.segmentItems} />
    </SegmentGroup.Root>
  );
};

export default Segment;
