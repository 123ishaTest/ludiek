// import { expect, test } from 'vitest';
//

import { expect, test } from 'vitest';

test(() => {
  expect(1).toBe(1);
});

// describe('Game launch smoke test', () => {
//   let game: DummyGame;
//
//   beforeEach(() => {
//     game = new DummyGame({
//       // wallet: new IgtWallet(['money']),
//       // settings: new IgtSettings(),
//       // codes: new IgtRedeemableCodes(),
//       // keyItems: new IgtKeyItems(),
//       // specialEvents: new IgtSpecialEvents(),
//       // statistics: new IgtStatistics(),
//       // achievements: new IgtAchievements(),
//     });
//   });
//
//   const ticks: number = 100;
//
//   const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
//
//   /**
//    * This smoke test starts the game and runs 100 game ticks.
//    * It fails if any exceptions are thrown.
//    */
//   test('smoke test', () => {
//     let tickCount = 0;
//     const unsub = game.onTick.sub((event: number) => {
//       tickCount++;
//       expect(event).toEqual(game.tickDuration);
//     });
//
//     expect(() => {
//       game.initialize();
//       game.load();
//       game.start();
//
//       for (let i = 0; i < ticks; i++) {
//         game.fakeTick(game.tickDuration);
//       }
//
//       expect(tickCount).toBe(ticks);
//     }).not.toThrow();
//
//     unsub();
//   });
//
//   test('starts and stops properly', async () => {
//     let tickCount = 0;
//     const unsub = game.onTick.sub((_sender, _event) => {
//       tickCount++;
//     });
//
//     game.initialize();
//     game.load();
//
//     const threeTicksMs = game.tickDuration * 3 * 1000;
//     await delay(threeTicksMs);
//     expect(tickCount).toBe(0);
//
//     game.start();
//     await delay(threeTicksMs);
//     expect(tickCount).toBeGreaterThan(0);
//
//     game.stop();
//     const tickCountAfterStop = tickCount;
//     expect(game.state).toBe('Stopped');
//     await delay(threeTicksMs);
//     expect(tickCount).toBe(tickCountAfterStop);
//
//     unsub();
//   });
// });
