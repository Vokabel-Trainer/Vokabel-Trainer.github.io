export type File = {
	categories: Array<Category>;
};

export type Category = {
	title: string;
	values: Record<string, string | Array<string>>;
};
