import CB from '../src';

describe('CB', () => {
	let cb = new CB();
	const cb1 = new CB(1);
	const cb2 = new CB([1, 1, 1, 1, 1]);
	test('constructor() sets proper tier and hp', () => {
		expect(cb.tier).toStrictEqual(0);
		expect(cb.boss).toStrictEqual([
			{ hp: 4000000, maxHp: 4000000, isHittable: true },
			{ hp: 6000000, maxHp: 6000000, isHittable: true },
			{ hp: 8000000, maxHp: 8000000, isHittable: true },
			{ hp: 10000000, maxHp: 10000000, isHittable: true },
			{ hp: 12000000, maxHp: 12000000, isHittable: true },
		]);
	});
	test('constructor() sets proper rounds', () => {
		expect(cb.rounds).toStrictEqual([1, 1, 1, 1, 1]);
		expect(cb1).toStrictEqual(cb);
		expect(cb2).toStrictEqual(cb1);
	});

	test('adjustRounds() sets proper rounds', () => {
		cb.adjustRounds();
		expect(cb2).toStrictEqual(cb);
	});

	test('should throw error on incorrect constructor', () => {
		try {
			cb = new CB([1, 2, 4, 3, 2]);
		} catch (error) {
			expect(error.message).toBe('Difference between rounds cannot be greater than 2!');
		}
		try {
			cb = new CB([1, 2, 3]);
		} catch (error) {
			expect(error.message).toBe('Rounds cannot be greater or less than 5!');
		}
	});

	test('bosses should have correct isHittable attribute, and tier should be correct', () => {
		cb.adjustRounds([4, 3, 3, 3, 3]);
		expect(cb.boss).toStrictEqual([
			{ hp: 4000000, maxHp: 4000000, isHittable: false },
			{ hp: 6000000, maxHp: 6000000, isHittable: true },
			{ hp: 8000000, maxHp: 8000000, isHittable: true },
			{ hp: 10000000, maxHp: 10000000, isHittable: true },
			{ hp: 12000000, maxHp: 12000000, isHittable: true },
		]);
		expect(cb.tier).toStrictEqual(0);
		cb.adjustRounds([25, 27, 26, 26, 27]);
		expect(cb.boss).toStrictEqual([
			{ hp: 12000000, maxHp: 12000000, isHittable: true },
			{ hp: 15000000, maxHp: 15000000, isHittable: false },
			{ hp: 18000000, maxHp: 18000000, isHittable: true },
			{ hp: 20000000, maxHp: 20000000, isHittable: true },
			{ hp: 23000000, maxHp: 23000000, isHittable: false },
		]);
		expect(cb.tier).toStrictEqual(2);
		cb.adjustRounds([8, 7, 8, 7, 7]);
		expect(cb.boss).toStrictEqual([
			{ hp: 6000000, maxHp: 6000000, isHittable: true },
			{ hp: 8000000, maxHp: 8000000, isHittable: true },
			{ hp: 10000000, maxHp: 10000000, isHittable: true },
			{ hp: 12000000, maxHp: 12000000, isHittable: true },
			{ hp: 15000000, maxHp: 15000000, isHittable: true },
		]);
		expect(cb.tier).toStrictEqual(1);
		cb.adjustRounds([11, 9, 10, 11, 9]);
		expect(cb.tier).toStrictEqual(1);
		expect(cb.boss).toStrictEqual([
			{ hp: 6000000, maxHp: 6000000, isHittable: false },
			{ hp: 8000000, maxHp: 8000000, isHittable: true },
			{ hp: 10000000, maxHp: 10000000, isHittable: true },
			{ hp: 12000000, maxHp: 12000000, isHittable: false },
			{ hp: 15000000, maxHp: 15000000, isHittable: true },
		]);
		cb.adjustRounds([41, 41, 41, 41, 41]);
		expect(cb.boss).toStrictEqual([
			{ hp: 90000000, maxHp: 90000000, isHittable: true },
			{ hp: 95000000, maxHp: 95000000, isHittable: true },
			{ hp: 100000000, maxHp: 100000000, isHittable: true },
			{ hp: 110000000, maxHp: 110000000, isHittable: true },
			{ hp: 130000000, maxHp: 130000000, isHittable: true },
		]);
		expect(cb.tier).toStrictEqual(4);
	});
});

describe('CB interaction', () => {
	const cb = new CB();
	test('hitting and killing and setting hp should work', () => {
		cb.hit(0, 2000000);
		expect([cb.rounds, cb.tier, cb.boss]).toStrictEqual([
			[1, 1, 1, 1, 1],
			0,
			[
				{ hp: 2000000, maxHp: 4000000, isHittable: true },
				{ hp: 6000000, maxHp: 6000000, isHittable: true },
				{ hp: 8000000, maxHp: 8000000, isHittable: true },
				{ hp: 10000000, maxHp: 10000000, isHittable: true },
				{ hp: 12000000, maxHp: 12000000, isHittable: true },
			],
		]);
		cb.hit(1, 6000000);
		cb.hit(2, 8000000);
		expect([cb.rounds, cb.tier, cb.boss]).toStrictEqual([
			[1, 2, 2, 1, 1],
			0,
			[
				{ hp: 2000000, maxHp: 4000000, isHittable: true },
				{ hp: 6000000, maxHp: 6000000, isHittable: true },
				{ hp: 8000000, maxHp: 8000000, isHittable: true },
				{ hp: 10000000, maxHp: 10000000, isHittable: true },
				{ hp: 12000000, maxHp: 12000000, isHittable: true },
			],
		]);
		cb.hit(0, 2000000);
		expect([cb.rounds, cb.tier, cb.boss]).toStrictEqual([
			[2, 2, 2, 1, 1],
			0,
			[
				{ hp: 4000000, maxHp: 4000000, isHittable: true },
				{ hp: 6000000, maxHp: 6000000, isHittable: true },
				{ hp: 8000000, maxHp: 8000000, isHittable: true },
				{ hp: 10000000, maxHp: 10000000, isHittable: true },
				{ hp: 12000000, maxHp: 12000000, isHittable: true },
			],
		]);
		cb.kill(0);
		expect(() => {
			cb.kill(0);
		}).toThrowError();
		expect(() => {
			cb.hit(0, 4000000);
		}).toThrowError();
		expect(() => {
			cb.setHp(0, 3000000);
		}).toThrowError();
		cb.setHp(2, 3000000);
		cb.setHp(3, 0);
		cb.setHp(3, 11000000);
		expect([cb.rounds, cb.tier, cb.boss]).toStrictEqual([
			[3, 2, 2, 2, 1],
			0,
			[
				{ hp: 4000000, maxHp: 4000000, isHittable: false },
				{ hp: 6000000, maxHp: 6000000, isHittable: true },
				{ hp: 3000000, maxHp: 8000000, isHittable: true },
				{ hp: 10000000, maxHp: 10000000, isHittable: true },
				{ hp: 12000000, maxHp: 12000000, isHittable: true },
			],
		]);
	});
});

describe('CB route', () => {
	// custom tester
	test('should progress', () => {
		const cb = new CB();
		for (let i = 0; i < 500; i++) {
			const boss = Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4;
			const amnt = Math.floor(12000000 + Math.random() * 30000000);
			try {
				console.log(`hitting boss ${boss + 1} with amount ${amnt}`);
				cb.hit(boss, amnt);
				console.log(`Done! round: ${cb.rounds.toString()}, Tier: ${cb.tier}`);
			} catch (err) {
				console.log(err.message);
			}
		}
		expect(cb.rounds.every((val) => val >= 41) && cb.tier === 4).toStrictEqual(true);
	});
});