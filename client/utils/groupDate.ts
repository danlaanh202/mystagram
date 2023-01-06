import { IMessage } from "../types";
interface IGroup {
  [key: string]: IMessage[];
}
export function groupDateOfMessages(data: IMessage[]) {
  let groups: IGroup = {};

  data.forEach(function (val: any) {
    let date = val.created_at?.split("T")[0];
    if (date in groups) {
      groups[date].push(val);
    } else {
      groups[date] = new Array(val);
    }
  });
  let groupedArray: IMessage[] = [];

  for (let key in groups) {
    groups[key].map((item, index) => groupedArray.push(item));
    groupedArray.push({
      date: groups[key][groups[key].length - 1].created_at as string,
      _id: groups[key][groups[key].length - 1].created_at as string,
      type: "annouce",
      user: "none",
      message: "none",
    });
  }
  return groupedArray;
}
