import { IMessage } from "../types";

export function groupDateOfMessages(data: IMessage[]) {
  var groups: any = {};

  data.forEach(function (val: any) {
    // console.log(formatDate)
    var date = val.created_at.split("T")[0];
    if (date in groups) {
      groups[date].push(val);
    } else {
      groups[date] = new Array(val);
    }
  });
  //   let groupedArray = []

  for (let key in groups) {
    console.log(key);
  }

  return groups;
}
