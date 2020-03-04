declare interface Array<T> {
  shuffle(): Array<T>
  flat(): Array<any>
}

declare interface Object {
  values(obj: object): Array<any>
}

declare interface String {
  padStart(targetLength: number, padString?: string)
}