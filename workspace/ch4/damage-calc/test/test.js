"use strict";
const dc = require("../");

describe("#effectiveDamage()", () => {
  test("should calculate damege accurately", () => {
    expect(dc.effectiveDamage(100, 50, 30)).toBe(83);
  });

  test("should calculate damage accurately when given negative value", () => {
    expect(dc.effectiveDamage(-1, 0, 0)).toBe(0);
    expect(dc.effectiveDamage(0, -1, 0)).toBe(0);
    expect(dc.effectiveDamage(0, 0, -1)).toBe(0);
  });

  test("should calculate damage accurately when given a value larger than 2000", () => {
    expect(dc.effectiveDamage(2001, 0, 0)).toBe(2000);
    expect(dc.effectiveDamage(300, 2150, 0)).toBe(14);
    expect(dc.effectiveDamage(300, 2000, 2001)).toBe(300);
  });

  test("armor should not be lower than 0", () => {
    expect(dc.effectiveDamage(500, 100, 800)).toBe(500);
  });
});
