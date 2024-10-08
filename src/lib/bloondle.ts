import { base } from '$app/paths';
import { prop } from '$lib/wordle';

export const category = 'tower';

export const info = `
<p>
    For debut clues, higher/lower is based on debut date of the character, not of the game. For
    example, Churchill would be higher than Quincy, even though they debuted in the same game.
</p>
<p>Hard mode includes heroes.<p/>`;

const bloons = prop('Bloons', { value: new Date('March 27, 2007') });

const btd1 = prop('BTD1', { full: 'Bloons Tower Defense', value: new Date('August 16, 2007') });
const btd3 = prop('BTD3', { full: 'Bloons Tower Defense 3', value: new Date('September 5, 2008') });
const btd4 = (date: string) =>
	prop('BTD4', { full: 'Bloons Tower Defense 4', value: new Date(date) });
const btd5 = (date: string) =>
	prop('BTD5', { full: 'Bloons Tower Defense 5', value: new Date(date) });
const btd6 = (date: string) =>
	prop('BTD6', { full: 'Bloons Tower Defense 6', value: new Date(date) });

const btdb = (date: string) =>
	prop('BTDB', { full: 'Bloons Tower Defense Battles', value: new Date(date) });
const btdb2 = (date: string) =>
	prop('BTDB2', { full: 'Bloons Tower Defense Battles 2', value: new Date(date) });

const hard = {
	'Admiral Brickell': {
		src: `${base}/bloondle/icons/admiral-brickell.webp`,
		class: 'Hero',
		cost: 900,
		footprint: 7,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd6('May 27, 2020'),
	},
	Adora: {
		src: `${base}/bloondle/icons/adora.webp`,
		class: 'Hero',
		cost: 1000,
		footprint: 7,
		camo: 'No',
		type: 'Plasma',
		debut: btd6('December 13, 2019'),
	},
	'Agent Jericho': {
		src: `${base}/bloondle/icons/agent-jericho.webp`,
		class: 'Hero',
		cost: 850,
		footprint: 6,
		camo: 'Yes',
		type: 'Sharp',
		debut: btdb2('April 26, 2023'),
	},
	Alchemist: {
		src: `${base}/bloondle/icons/alchemist.webp`,
		class: 'Magic',
		cost: 550,
		footprint: 6,
		camo: 'No',
		type: 'Acid',
		debut: btd6('June 13, 2018'),
	},
	'Banana Farm': {
		src: `${base}/bloondle/icons/banana-farm.webp`,
		class: 'Support',
		cost: 1250,
		footprint: 30,
		camo: 'No',
		type: 'Passive',
		debut: btd4('October 26, 2009'),
	},
	'Beast Handler': {
		src: `${base}/bloondle/icons/beast-handler.webp`,
		class: 'Support',
		cost: 250,
		footprint: 7,
		camo: 'Yes',
		type: 'Energy',
		debut: btd6('April 3, 2023'),
	},
	Beekeeper: {
		src: `${base}/bloondle/icons/beekeeper.webp`,
		class: 'Primary',
		cost: 700,
		footprint: 6,
		camo: 'No',
		type: 'Sharp',
		debut: btd4('May 17, 2012'),
	},
	Benjamin: {
		src: `${base}/bloondle/icons/benjamin.webp`,
		class: 'Hero',
		cost: 1200,
		footprint: 7,
		camo: 'Yes',
		type: 'Passive',
		debut: btd6('August 22, 2018'),
	},
	Bloonchipper: {
		src: `${base}/bloondle/icons/bloonchipper.webp`,
		class: 'Support',
		cost: 750,
		footprint: 6,
		camo: 'No',
		type: 'Shatter',
		debut: btd5('August 15, 2012'),
	},
	'Bomb Shooter': {
		src: `${base}/bloondle/icons/bomb-shooter.webp`,
		class: 'Primary',
		cost: 375,
		footprint: 7,
		camo: 'No',
		type: 'Explosion',
		debut: btd1,
	},
	Bonnie: {
		src: `${base}/bloondle/icons/bonnie.webp`,
		class: 'Hero',
		cost: 700,
		footprint: 6, // TODO: check later
		camo: 'Yes',
		type: 'Explosion',
		debut: btdb2('August 31, 2024'),
	},
	'Boomerang Monkey': {
		src: `${base}/bloondle/icons/boomerang-monkey.webp`,
		class: 'Primary',
		cost: 315,
		footprint: 7,
		camo: 'No',
		type: 'Sharp',
		debut: bloons,
	},
	'Captain Churchill': {
		src: `${base}/bloondle/icons/captain-churchill.webp`,
		class: 'Hero',
		cost: 2000,
		footprint: 8,
		camo: 'Yes',
		type: 'Explosion',
		debut: btd6('July 23, 2018'),
	},
	COBRA: {
		src: `${base}/bloondle/icons/cobra.webp`,
		class: 'Military',
		cost: 925,
		footprint: 6,
		camo: 'Yes',
		type: 'Sharp',
		debut: btdb('August 18, 2014'),
	},
	Corvus: {
		src: `${base}/bloondle/icons/corvus.webp`,
		class: 'Hero',
		cost: 925,
		footprint: 7,
		camo: 'Yes',
		type: 'Normal',
		debut: btd6('December 5, 2023'),
	},
	'Dart Monkey': {
		src: `${base}/bloondle/icons/dart-monkey.webp`,
		class: 'Primary',
		cost: 200,
		footprint: 6,
		camo: 'Yes',
		type: 'Sharp',
		debut: bloons,
	},
	'Dartling Gunner': {
		src: `${base}/bloondle/icons/dartling-gunner.webp`,
		class: 'Military',
		cost: 850,
		footprint: 7,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd4('May 7, 2011'),
	},
	Druid: {
		src: `${base}/bloondle/icons/druid.webp`,
		class: 'Magic',
		cost: 400,
		footprint: 7,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd6('June 13, 2018'),
	},
	'Engineer Monkey': {
		src: `${base}/bloondle/icons/engineer-monkey.webp`,
		class: 'Support',
		cost: 350,
		footprint: 7,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd5('August 15, 2012'),
	},
	Etienne: {
		src: `${base}/bloondle/icons/etienne.webp`,
		class: 'Hero',
		cost: 850,
		footprint: 7,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd6('September 2, 2020'),
	},
	Ezili: {
		src: `${base}/bloondle/icons/ezili.webp`,
		class: 'Hero',
		cost: 600,
		footprint: 7,
		camo: 'Yes',
		type: 'Plasma',
		debut: btd6('December 13, 2018'),
	},
	Geraldo: {
		src: `${base}/bloondle/icons/geraldo.webp`,
		class: 'Hero',
		cost: 750,
		footprint: 7,
		camo: 'Yes',
		type: ['Energy', 'Sharp'],
		debut: btd6('April 13, 2022'),
	},
	'Glue Gunner': {
		src: `${base}/bloondle/icons/glue-gunner.webp`,
		class: 'Primary',
		cost: 225,
		footprint: 6,
		camo: 'Yes',
		type: 'Acid',
		debut: btd4('October 26, 2009'),
	},
	Gwendolin: {
		src: `${base}/bloondle/icons/gwendolin.webp`,
		class: 'Hero',
		cost: 725,
		footprint: 7,
		camo: 'No',
		type: 'Fire',
		debut: btd6('June 13, 2018'),
	},
	'Heli Pilot': {
		src: `${base}/bloondle/icons/heli-pilot.webp`,
		class: 'Military',
		cost: 1600,
		footprint: 27,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd5('November 15, 2012'),
	},
	'Ice Monkey': {
		src: `${base}/bloondle/icons/ice-monkey.webp`,
		class: 'Primary',
		cost: 500,
		footprint: 6,
		camo: 'Yes',
		type: 'Cold',
		debut: btd1,
	},
	Mermonkey: {
		src: `${base}/bloondle/icons/mermonkey.webp`,
		class: 'Magic',
		cost: 600,
		footprint: 8,
		camo: 'Yes',
		type: ['Normal', 'Shatter'],
		debut: btd6('August 1, 2024'),
	},
	'Monkey Ace': {
		src: `${base}/bloondle/icons/monkey-ace.webp`,
		class: 'Military',
		cost: 800,
		footprint: 18,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd4('October 26, 2009'),
	},
	'Monkey Buccaneer': {
		src: `${base}/bloondle/icons/monkey-buccaneer.webp`,
		class: 'Military',
		cost: 400,
		footprint: 8,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd4('October 26, 2009'),
	},
	'Monkey Sub': {
		src: `${base}/bloondle/icons/monkey-sub.webp`,
		class: 'Military',
		cost: 325,
		footprint: 'Medium',
		camo: 'Yes',
		type: 'Sharp',
		debut: btd5('November 22, 2013'),
	},
	'Monkey Village': {
		src: `${base}/bloondle/icons/monkey-village.webp`,
		class: 'Support',
		cost: 1200,
		footprint: 11,
		camo: 'Yes',
		type: 'Passive',
		debut: btd3,
	},
	'Mortar Monkey': {
		src: `${base}/bloondle/icons/mortar-monkey.webp`,
		class: 'Military',
		cost: 750,
		footprint: 9,
		camo: 'Yes',
		type: 'Explosion',
		debut: btd4('October 26, 2009'),
	},
	'Ninja Monkey': {
		src: `${base}/bloondle/icons/ninja-monkey.webp`,
		class: 'Magic',
		cost: 400,
		footprint: 6,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd5('December 15, 2011'),
	},
	'Obyn Greenfoot': {
		src: `${base}/bloondle/icons/obyn-greenfoot.webp`,
		class: 'Hero',
		cost: 650,
		footprint: 8,
		camo: 'No',
		type: 'Plasma',
		debut: btd6('June 13, 2018'),
	},
	'Pat Fusty': {
		src: `${base}/bloondle/icons/pat-fusty.webp`,
		class: 'Hero',
		cost: 800,
		footprint: 8,
		camo: 'No',
		type: 'Normal',
		debut: btd6('March 5, 2019'),
	},
	Psi: {
		src: `${base}/bloondle/icons/psi.webp`,
		class: 'Hero',
		cost: 1000,
		footprint: 7,
		camo: 'Yes',
		type: 'Plasma',
		debut: btd6('June 4, 2021'),
	},
	Quincy: {
		src: `${base}/bloondle/icons/quincy.webp`,
		class: 'Hero',
		cost: 540,
		footprint: 7,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd6('June 13, 2018'),
	},
	Rosalia: {
		src: `${base}/bloondle/icons/rosalia.webp`,
		class: 'Hero',
		cost: 875,
		footprint: 6,
		camo: 'No',
		type: 'Energy',
		debut: btd6('May 29, 2024'),
	},
	Sauda: {
		src: `${base}/bloondle/icons/sauda.webp`,
		class: 'Hero',
		cost: 600,
		footprint: 7,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd6('March 11, 2021'),
	},
	'Sniper Monkey': {
		src: `${base}/bloondle/icons/sniper-monkey.webp`,
		class: 'Military',
		cost: 350,
		footprint: 6,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd5('December 15, 2011'),
	},
	'Spike Factory': {
		src: `${base}/bloondle/icons/spike-factory.webp`,
		class: 'Support',
		cost: 1000,
		footprint: 8,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd4('September 8, 2011'),
	},
	'Spike-o-pult': {
		src: `${base}/bloondle/icons/spike-o-pult.webp`,
		class: 'Primary',
		cost: 610,
		footprint: 6,
		camo: 'No',
		type: 'Shatter',
		debut: prop('BTD3', { full: 'Bloons TD', value: new Date('September 2, 2008') }),
	},
	'Striker Jones': {
		src: `${base}/bloondle/icons/striker-jones.webp`,
		class: 'Hero',
		cost: 700,
		footprint: 7,
		camo: 'No',
		type: 'Explosion',
		debut: btd6('June 13, 2018'),
	},
	'Super Monkey': {
		src: `${base}/bloondle/icons/super-monkey.webp`,
		class: 'Magic',
		cost: 2500,
		footprint: 11,
		camo: 'Yes',
		type: 'Sharp',
		debut: btd1,
	},
	'Tack Shooter': {
		src: `${base}/bloondle/icons/tack-shooter.webp`,
		class: 'Primary',
		cost: 260,
		footprint: 6,
		camo: 'No',
		type: 'Sharp',
		debut: btd1,
	},
	'Wizard Monkey': {
		src: `${base}/bloondle/icons/wizard-monkey.webp`,
		class: 'Magic',
		cost: 325,
		footprint: 7,
		camo: 'Yes',
		type: 'Energy',
		debut: btd4('October 26, 2009'),
	},
} as const;

// Exclude heroes.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const normal = Object.fromEntries(Object.entries(hard).filter(([k, v]) => v.class !== 'Hero'));

export const sets = { normal, hard };
