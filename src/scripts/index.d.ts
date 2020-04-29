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

declare interface Element {
  clearChildren(): any
}

interface AlertEvent extends Event {
  readonly detail: {
    type: AlertType,
    message: string,
    head?: string
  }
}

interface Score {
  name: string
  score: number
  time: number
}