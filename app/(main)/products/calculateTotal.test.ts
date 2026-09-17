import { describe, test, expect } from "vitest";
import { calculateTotal } from "./calculateTotal";

describe("Product Page", () => {
    test("คำนวณราคารวมที่ถูก", () => {
        expect(calculateTotal(500, 3)).toBe(1500)
    })
})