declare module 'bad-words' {
  export default class Filter {
    constructor(options?: { placeHolder?: string; regex?: RegExp; replaceRegex?: RegExp; splitRegex?: RegExp })
    isProfane(string: string): boolean
    replaceWord(string: string): string
    clean(string: string): string
    addWords(...words: string[]): void
    removeWords(...words: string[]): void
  }
}
