import { isArray, isObject } from "underscore";

export const parseAdditional = (items: any) => {
  if(!items || items.length === 0) {
    return {}
  }

  if(isArray(items)) {
    return items.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  }

  if(isObject(items)) {
    const acc = [] as any
    Object.keys(items).map((item: any) => {
      acc.push({
        key: item,
        value: items[item]
      })
    })

    return acc;
  }
}