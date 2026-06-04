export const cn = (...args: Array<string | undefined | false | null>): string =>
  args.filter(Boolean).join(" ");
