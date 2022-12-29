export function getShortTime(str: string) {
  let splitTime = str.split(" ");
  return `${splitTime[0]}${splitTime[1].charAt(0)}`;
}
