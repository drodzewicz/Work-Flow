export const boardInfo_DATA = {
	name: "testing new reat features",
	description:
		"hallo Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum rem tempore ex numquamexpedita. Blanditiis error eum officia unde, velit adipisci provident, doloribus, idquisquam harum reprehenderit ipsa! Earum reprehenderit accusamus ipsum ipsa voluptate voluptatum corrupti ratione, doloribus, doloremque amet magni adipisci? Recusandaenesciunt laborum assumenda saepe quo facere dolor!",
};

export const userList_DATA = [
	{ id: "user_1", username: "user_juan", imageURL: "link1" },
	{ id: "user_2", username: "userDos", imageURL: "link1" },
	{ id: "user_3", username: "trijadoUserino", imageURL: "link1" },
	{ id: "user_4", username: "danilka.Kashin", imageURL: "link1" },
	{ id: "user_5", username: "quintakill", imageURL: "link1" },
	{ id: "user_6", username: "seiseiseite", imageURL: "link1" },
	{ id: "user_7", username: "trisemiorachki", imageURL: "link1" },
	{ id: "user_8", username: "bossuser", imageURL: "link1" },
	{ id: "user_9", username: "synonim", imageURL: "link1" },
	{ id: "user_10", username: "samJA", imageURL: "link1" },
];

export const taskColumns_DATA = [
	{
		id: "122jhdwdw",
		name: "backlog",
	},
	{
		id: "tod35050",
		name: "to-do",
	},
	{
		id: "don4656335",
		name: "done",
	},
];

export const singleTask_DATA = {
	id: "TSK1",
	name: "saving private ryan",
	description:
		"hallo Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum rem tempore ex numquamexpedita. Blanditiis error eum officia unde, velit adipisci provident, doloribus, idquisquam harum reprehenderit ipsa! Earum reprehenderit accusamus ipsum ipsa voluptate voluptatum corrupti ratione, doloribus, doloremque amet magni adipisci? Recusandaenesciunt laborum assumenda saepe quo facere dolor!",
	column: {
		id: "122jhdwdw",
		name: "backlog",
	},
	tags: [
		{ color: "red", id: "dwdw44545", name: "BUG" },
		{ color: "tiel", id: "fe555", name: "backend" },
		{ color: "pink", id: "fghha466", name: "UI/UX" },
	],
	author: { id: "use2", username: "user2", imageURL: "kke" },
	people: [{ id: "use1", username: "user1", imageURL: "kke" }],
};

export const boardTasks_2_DATA = [
	{
		_id: "122jhdwdw",
		name: "backlog",
		tasks: [
			{
				_id: "TSK1",
				name: "saving one",
				tags: [
					{ color: "red", id: "bug-red", name: "BUG" },
					{ color: "yellow", id: "fix-yellow", name: "FIX" },
					{ color: "green", id: "new-green", name: "NEW" },
					{ color: "tiel", id: "frontend-tiel", name: "Frontend" },
					{ color: "purple", id: "fghhpurpebackenda466", name: "Backend" },
					{ color: "majenta", id: "devops-majenta", name: "Devops" },
					{ color: "pink", id: "backlog-pink", name: "backlog" },
					{ color: "black", id: "custom-black", name: "Custom" },
					{ color: "white", id: "uiwhite", name: "UI/UX" },
				],
				people: [
					{ id: "use1", username: "user1", imageURL: "kke" },
					{ id: "use2", username: "user2", imageURL: "kke" },
					{ id: "use3", username: "user3", imageURL: "kke" },
					{ id: "use4", username: "user4", imageURL: "kke" },
					{ id: "use5", username: "user5", imageURL: "kke" },
				],
			},
			{
				_id: "TSK2",
				name: "private ryan",
				tags: [
					{ color: "tiel", id: "fe555", name: "backend" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [{ id: "use1", username: "user1", imageURL: "kke" }],
			},
			{
				_id: "TSK3",
				name: "czy nieeeeeeeee",
				tags: [
					{ color: "red", id: "dwdw44545", name: "BUG" },
					{ color: "tiel", id: "fe555", name: "backend" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [{ id: "use1", username: "user1", imageURL: "kke" }],
			},
		],
	},
	{
		_id: "dwdw56565",
		name: "to-do",
		tasks: [
			{
				_id: "TSK12",
				name: "deekens az tak to mozna zagrac jak najbardziej tez nie jeszcze raz",
				tags: [
					{ color: "red", id: "dwdw44545", name: "BUG" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [
					{ id: "use1", username: "user1", imageURL: "kke" },
					{ id: "use2", username: "user2", imageURL: "kke" },
				],
			},
			{
				_id: "TSK13",
				name: "prawda falsz",
				tags: [
					{ color: "tiel", id: "fe555", name: "backend" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [{ id: "use1", username: "user1", imageURL: "kke" }],
			},
			{
				_id: "TSK14",
				name: "dawwwnooo",
				tags: [
					{ color: "red", id: "dwdw44545", name: "BUG" },
					{ color: "tiel", id: "fe555", name: "backend" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [{ id: "use1", username: "user1", imageURL: "kke" }],
			},
			{
				_id: "TSK15",
				name: "555 dawwwnoo fffe",
				tags: [
					{ color: "red", id: "dwdw44545", name: "BUG" },
					{ color: "tiel", id: "fe555", name: "backend" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [{ id: "use1", username: "user1", imageURL: "kke" }],
			},
			{
				_id: "TSK16",
				name: "lorem ipsum lorem 65 ipsum jeszcze ipsum i ujeszcze trovhe ipsum",
				tags: [
					{ color: "red", id: "dwdw44545", name: "BUG" },
					{ color: "tiel", id: "fe555", name: "backend" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [{ id: "use1", username: "user1", imageURL: "kke" }],
			},
			{
				_id: "TSK17",
				name: "an okoko",
				tags: [
					{ color: "red", id: "dwdw44545", name: "BUG" },
					{ color: "tiel", id: "fe555", name: "backend" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [{ id: "use1", username: "user1", imageURL: "kke" }],
			},
			{
				_id: "TSK18",
				name: "another one",
				tags: [
					{ color: "red", id: "dwdw44545", name: "BUG" },
					{ color: "tiel", id: "fe555", name: "backend" },
					{ color: "pink", id: "fghha466", name: "UI/UX" },
				],
				people: [{ id: "use1", username: "user1", imageURL: "kke" }],
			},
		],
	},
	{
		_id: "do35665646",
		name: "done",
		tasks: [],
	},
];

export const boardTasks_DATA = [
	{
		id: "TSK1",
		name: "saving private ryan",
		column: {
			id: "122jhdwdw",
			name: "backlog",
		},
		tags: [
			{ color: "red", id: "dwdw44545", name: "BUG" },
			{ color: "tiel", id: "fe555", name: "backend" },
			{ color: "pink", id: "fghha466", name: "UI/UX" },
		],
		people: [
			{ id: "use1", username: "user1", imageURL: "kke" },
			{ id: "use2", username: "user2", imageURL: "kke" },
			{ id: "use3", username: "user3", imageURL: "kke" },
			{ id: "use4", username: "user4", imageURL: "kke" },
			{ id: "use5", username: "user5", imageURL: "kke" },
		],
	},
	{
		id: "TSK2",
		name: "lauthing my kekus off",
		column: {
			id: "122jhdwdw",
			name: "backlog",
		},
		tags: [
			{ color: "pink", id: "fghha466", name: "UI/UX" },
			{ color: "yellow", id: "6577ff", name: "DevOps" },
		],
		people: [{ id: "use2", username: "user2", imageURL: "kke" }],
	},
	{
		id: "TSK3",
		name: "do not forget to get more information on taht thing we talked about and check it again ok???",
		column: {
			id: "122jhdwdw",
			name: "backlog",
		},
		tags: [
			{ color: "tiel", id: "fe555", name: "backend" },
			{ color: "pink", id: "fghha466", name: "UI/UX" },
			{ color: "yellow", id: "6577ff", name: "DevOps" },
			{ color: "green", id: "fefef46", name: "FIX" },
		],
		people: [{ id: "use2", username: "user2", imageURL: "kke" }],
	},
	{
		id: "TSK4",
		name: "just finnish the project and all be done :/",
		column: {
			id: "tod35050",
			name: "to-do",
		},
		tags: [{ color: "tiel", id: "fe555", name: "backend" }],
		people: [
			{ id: "use1", username: "user1", imageURL: "kke" },
			{ id: "use2", username: "user2", imageURL: "kke" },
			{ id: "use3", username: "user3", imageURL: "kke" },
			{ id: "use4", username: "user4", imageURL: "kke" },
		],
	},
	{
		id: "TSK5",
		name: "remember to smile everyday at work becaus if you don't you wont get payed",
		column: {
			id: "tod35050",
			name: "to-do",
		},
		tags: [
			{ color: "green", id: "fefef46", name: "FIX" },
			{ color: "tiel", id: "fe555", name: "backend" },
		],
		people: [{ id: "use2", username: "user2", imageURL: "kke" }],
	},
	{
		id: "TSK6",
		name: "redo last commit you dips-shit",
		column: {
			id: "tod35050",
			name: "to-do",
		},
		tags: [
			{ color: "pink", id: "fghha466", name: "UI/UX" },
			{ color: "yellow", id: "6577ff", name: "DevOps" },
		],
		people: [],
	},
	{
		id: "TSK7",
		name: "eluuuuu, noooo",
		column: {
			id: "don4656335",
			name: "done",
		},
		tags: [
			{ color: "tiel", id: "fe555", name: "backend" },
			{ color: "pink", id: "fghha466", name: "UI/UX" },
			{ color: "yellow", id: "6577ff", name: "DevOps" },
		],
		people: [{ id: "use1", username: "user1", imageURL: "kke" }],
	},
	{
		id: "TSK8",
		name: "saving your ass, taht last commit wa shieeeet",
		column: {
			id: "don4656335",
			name: "done",
		},
		tags: [
			{ color: "yellow", id: "6577ff", name: "DevOps" },
			{ color: "green", id: "fefef46", name: "FIX" },
			{ color: "red", id: "dwdw44545", name: "BUG" },
		],
		people: [{ id: "use1", username: "user1", imageURL: "kke" }],
	},
	{
		id: "TSK9",
		name: "what doy ou do in the open fiel, I dont know",
		column: {
			id: "122jhdwdw",
			name: "backlog",
		},
		tags: [
			{ color: "red", id: "dwdw44545", name: "BUG" },
			{ color: "tiel", id: "fe555", name: "backend" },
			{ color: "pink", id: "fghha466", name: "UI/UX" },
			{ color: "yellow", id: "6577ff", name: "DevOps" },
			{ color: "green", id: "fefef46", name: "FIX" },
		],
		people: [
			{ id: "use1", username: "user1", imageURL: "kke" },
			{ id: "use2", username: "user2", imageURL: "kke" },
			{ id: "use5", username: "user5", imageURL: "kke" },
			{ id: "use6", username: "user6", imageURL: "kke" },
		],
	},
	{
		id: "TSK10",
		name: "project power is a shit movie, forget anbout it",
		column: {
			id: "don4656335",
			name: "done",
		},
		tags: [
			{ color: "yellow", id: "6577ff", name: "DevOps" },
			{ color: "green", id: "fefef46", name: "FIX" },
		],
		people: [{ id: "use2", username: "user2", imageURL: "kke" }],
	},
	{
		id: "TSK11",
		name: "ryan reynolds is a overated actor",
		column: {
			id: "don4656335",
			name: "done",
		},
		tags: [{ color: "tiel", id: "fe555", name: "backend" }],
		people: [{ id: "use1", username: "user1", imageURL: "kke" }],
	},
	{
		id: "TSK12",
		name: "remebebr the sauce",
		column: {
			id: "don4656335",
			name: "done",
		},
		tags: [
			{ color: "tiel", id: "fe555", name: "backend" },
			{ color: "pink", id: "fghha466", name: "UI/UX" },
		],
		people: [
			{ id: "use1", username: "user1", imageURL: "kke" },
			{ id: "use2", username: "user2", imageURL: "kke" },
			{ id: "use3", username: "user3", imageURL: "kke" },
			{ id: "use4", username: "user4", imageURL: "kke" },
		],
	},
];

export const boardMembers_DATA = [
	{
		id: "1j2j3",
		username: "morowiecki",
		imageURL: "link1",
		userType: "owner",
	},
	{
		id: "1j3d43",
		username: "morowka",
		imageURL: "link1",
		userType: "admin",
	},
	{
		id: "1576j3",
		username: "user3",
		imageURL: "link1",
		userType: "regular",
	},
	{
		id: "675343",
		username: "kieliszek",
		imageURL: "link1",
		userType: "admin",
	},
	{ id: "433j3", username: "user5", imageURL: "link1", userType: "regular" },
	{
		id: "1j3rrr",
		username: "user6",
		imageURL: "link1",
		userType: "regular",
	},
	{
		id: "15tttj3",
		username: "siema",
		imageURL: "link1",
		userType: "regular",
	},
	{
		id: "67eredr3",
		username: "asystka",
		imageURL: "link1",
		userType: "guest",
	},
];

export const boards_DATA = [
	[
		{
			id: "board_id_1",
			title: "Jeden liczmy po kolei",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_2",
			title: "dwa jest po drugiej",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_3",
			title: "trzy as ef",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_4",
			title: "cztery jest jesc",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: true,
		},
		{
			id: "board_id_5",
			title: "piec po obowi",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: true,
		},
		{
			id: "board_id_6",
			title: "szesc paniatna",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_7",
			title: "siedem slyszysz",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_8",
			title: "osiem problema",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
	],
	[
		{
			id: "board_id_9",
			title: "sziewidz czy dziewiec",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_10",
			title: "dziesiec jubeliejuszz",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_11",
			title: "jeden jedn",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_12",
			title: "dwa nascie",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_13",
			title: "trzy nascisko",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_14",
			title: "czternac poposynonim",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_15",
			title: "pietnosciii",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: true,
		},
		{
			id: "board_id_16",
			title: "szesnasty rok zycia",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
	],
	[
		{
			id: "board_id_17",
			title: "kilkasiedemnascie",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_18",
			title: "osiemnascisko",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_19",
			title: "nine nine one",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_20",
			title: "dwa zero",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_21",
			title: "jednymadziescia jeden",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: true,
		},
		{
			id: "board_id_22",
			title: "two two",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_23",
			title: "tres i dos",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
		{
			id: "board_id_24",
			title: "swa quatro",
			owner: { id: "kek123", username: "user1", imageURL: "test" },
			pinned: false,
		},
	],
];

export const pinnedBoards_DATA = [
	{
		id: "board_id_4",
		title: "cztery jest jesc",
		owner: { id: "kek123", username: "user1", imageURL: "test" },
		pinned: true,
	},
	{
		id: "board_id_5",
		title: "piec po obowi",
		owner: { id: "kek123", username: "user1", imageURL: "test" },
		pinned: true,
	},
	{
		id: "board_id_21",
		title: "jednymadziescia jeden",
		owner: { id: "kek123", username: "user1", imageURL: "test" },
		pinned: true,
	},
	{
		id: "board_id_15",
		title: "pietnosciii",
		owner: { id: "kek123", username: "user1", imageURL: "test" },
		pinned: true,
	},
];

export const tags_DATA = [
	{ color: "red", id: "dwdw44545", name: "frontend" },
	{ color: "tiel", id: "fefef455", name: "new things" },
	{ color: "majenta", id: "dddhhhtht", name: "UI" },
	{ color: "pink", id: "44yhthth", name: "Devops" },
	{ color: "purple", id: "fegg", name: "brand new fetures" },
	{ color: "green", id: "f4565656532", name: "another test" },
	{ color: "yellow", id: "yd45666", name: "Vue" },
	{ color: "black", id: "dwdwd4545", name: "React" },
	{ color: "white", id: "ggg45677", name: "Java spring boot" },
];
