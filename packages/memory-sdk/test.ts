/**
 * Test script for @substratia-io/memory SDK
 *
 * Usage:
 *   SUBSTRATIA_API_KEY=sk_xxx npx tsx test.ts
 */

// Test the 2-line API
import { remember, recall, forget, memory } from "./src/index.js";

async function test() {
  console.log("Testing @substratia-io/memory SDK (2-line API)\n");

  try {
    // Test 1: remember (the 2-line pattern!)
    console.log("1. Testing remember() - the 2-line API...");
    const { memoryId } = await remember("Test: User prefers dark mode", {
      importance: "normal",
      tags: ["test", "sdk", "preferences"],
    });
    console.log("   Created:", memoryId);

    // Test 2: recall
    console.log("\n2. Testing recall()...");
    const results = await recall("dark mode");
    console.log("   Found:", results.length, "matches");

    // Test 3: memory.list (full API)
    console.log("\n3. Testing memory.list()...");
    if (memory) {
      const all = await memory.list({ limit: 5 });
      console.log("   Found:", all.length, "memories");
      if (all.length > 0) {
        console.log("   Latest:", all[0].content.substring(0, 50) + "...");
      }
    }

    // Test 4: forget
    console.log("\n4. Testing forget()...");
    await forget(memoryId);
    console.log("   Deleted");

    console.log("\n✅ All tests passed!");
    console.log("\n📝 The 2-line pattern works:");
    console.log('   import { remember } from "@substratia-io/memory"');
    console.log('   await remember("User prefers dark mode")');
  } catch (error) {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  }
}

test();
