export const hourData = {
  0: { rotateRight: 'rotate-[0deg]', rotateLeft: '-rotate-[0deg]' },
  1: { rotateRight: 'rotate-[15deg]', rotateLeft: '-rotate-[15deg]' },
  2: { rotateRight: 'rotate-[30deg]', rotateLeft: '-rotate-[30deg]' },
  3: { rotateRight: 'rotate-[45deg]', rotateLeft: '-rotate-[45deg]' },
  4: { rotateRight: 'rotate-[60deg]', rotateLeft: '-rotate-[60deg]' },
  5: { rotateRight: 'rotate-[75deg]', rotateLeft: '-rotate-[75deg]' },
  6: { rotateRight: 'rotate-[90deg]', rotateLeft: '-rotate-[90deg]' },
  7: { rotateRight: 'rotate-[105deg]', rotateLeft: '-rotate-[105deg]' },
  8: { rotateRight: 'rotate-[120deg]', rotateLeft: '-rotate-[120deg]' },
  9: { rotateRight: 'rotate-[135deg]', rotateLeft: '-rotate-[135deg]' },
  10: { rotateRight: 'rotate-[150deg]', rotateLeft: '-rotate-[150deg]' },
  11: { rotateRight: 'rotate-[165deg]', rotateLeft: '-rotate-[165deg]' },
  12: { rotateRight: 'rotate-[180deg]', rotateLeft: '-rotate-[180deg]' },
  13: { rotateRight: 'rotate-[195deg]', rotateLeft: '-rotate-[195deg]' },
  14: { rotateRight: 'rotate-[210deg]', rotateLeft: '-rotate-[210deg]' },
  15: { rotateRight: 'rotate-[225deg]', rotateLeft: '-rotate-[225deg]' },
  16: { rotateRight: 'rotate-[240deg]', rotateLeft: '-rotate-[240deg]' },
  17: { rotateRight: 'rotate-[255deg]', rotateLeft: '-rotate-[255deg]' },
  18: { rotateRight: 'rotate-[270deg]', rotateLeft: '-rotate-[270deg]' },
  19: { rotateRight: 'rotate-[285deg]', rotateLeft: '-rotate-[285deg]' },
  20: { rotateRight: 'rotate-[300deg]', rotateLeft: '-rotate-[300deg]' },
  21: { rotateRight: 'rotate-[315deg]', rotateLeft: '-rotate-[315deg]' },
  22: { rotateRight: 'rotate-[330deg]', rotateLeft: '-rotate-[330deg]' },
  23: { rotateRight: 'rotate-[345deg]', rotateLeft: '-rotate-[345deg]' }
} as const satisfies { [key: number]: { rotateRight: string; rotateLeft: string } };

export const minuteData = {
  0: { rotateRight: 'rotate-[0deg]', rotateLeft: '-rotate-[0deg]' },
  5: { rotateRight: 'rotate-[30deg]', rotateLeft: '-rotate-[30deg]' },
  10: { rotateRight: 'rotate-[60deg]', rotateLeft: '-rotate-[60deg]' },
  15: { rotateRight: 'rotate-[90deg]', rotateLeft: '-rotate-[90deg]' },
  20: { rotateRight: 'rotate-[120deg]', rotateLeft: '-rotate-[120deg]' },
  25: { rotateRight: 'rotate-[150deg]', rotateLeft: '-rotate-[150deg]' },
  30: { rotateRight: 'rotate-[180deg]', rotateLeft: '-rotate-[180deg]' },
  35: { rotateRight: 'rotate-[210deg]', rotateLeft: '-rotate-[210deg]' },
  40: { rotateRight: 'rotate-[240deg]', rotateLeft: '-rotate-[240deg]' },
  45: { rotateRight: 'rotate-[270deg]', rotateLeft: '-rotate-[270deg]' },
  50: { rotateRight: 'rotate-[300deg]', rotateLeft: '-rotate-[300deg]' },
  55: { rotateRight: 'rotate-[330deg]', rotateLeft: '-rotate-[330deg]' }
} as const satisfies { [key: number]: { rotateRight: string; rotateLeft: string } };

export const pad = (num: number) => (num < 10 ? `0${num}` : num.toString());
