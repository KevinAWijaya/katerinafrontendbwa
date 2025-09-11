export type TLocales = "en-US" | "id-ID";

declare global {
  interface Number {
    thousands(locales?: TLocales): string;
  }
}

Number.prototype.thousands = function (locales: TLocales = "id-ID"): string {
  return new Intl.NumberFormat(locales).format(this.valueOf());
};
