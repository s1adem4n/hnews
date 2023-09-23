import Config from './config';

export type IDList = number[];
export type ItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
export type Item = {
	id: number;
	deleted?: boolean;
	type?: ItemType;
	by?: string;
	time?: number;
	text?: string;
	dead?: boolean;
	parent?: number;
	poll?: number;
	kids?: IDList;
	url?: string;
	score?: number;
	title?: string;
	parts?: IDList;
	descendants?: number;
};

const getItem = async (id: number): Promise<Item | null> => {
	const response = await fetch(`${Config.API_URL}item/${id}.json`);
	if (!response.ok) {
		return null;
	}
	const item = await response.json();
	return item;
};

const getItems = async (ids: IDList): Promise<(Item | null)[]> => {
	const items = await Promise.all(ids.map((id) => getItem(id)));
	return items;
};

export { getItem, getItems };
