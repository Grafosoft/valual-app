type subInfoProps = {
    [key: string]: any
  }
  
  export const getObjectFilter = (
    searchText: string | undefined,
    arrayData: Array<any>,
  ) => arrayData.find((subInfo: subInfoProps) => subInfo[''] === searchText)