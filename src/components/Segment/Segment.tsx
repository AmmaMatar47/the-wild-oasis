import styles from './Segment.module.scss';

import { SegmentGroup } from '@chakra-ui/react';

const Segment = ({
  items,
  value,
  setValue,
}: {
  items: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <SegmentGroup.Root
      value={value}
      onValueChange={e => setValue(e.value)}
      bgColor='var(--color-grey-0)'
      height='fit-content'
      width='auto'
      shadow='xs'
    >
      <SegmentGroup.Indicator color='var(--color-grey-0)' bgColor='var(--color-brand-600)' />
      <SegmentGroup.Items
        items={items}
        padding='1.2rem'
        color='var(--color-grey-700)'
        fontSize='1.4rem'
        fontWeight='500'
        className={styles.segmentItems}
      />
    </SegmentGroup.Root>
  );
};

export default Segment;
