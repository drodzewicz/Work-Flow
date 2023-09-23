// const authQueryKeys = {
//     all: [{ scope: "todos" }] as const,
//     lists: () => [{ ...authQueryKeys.all[0], entity: "list" }] as const,
//     list: (state: any, sorting: any) => [{ ...authQueryKeys.lists()[0], state, sorting }] as const,
//   };

const boardQueryKeys = {
  all: [{ scope: "board" }] as const,
  item: (id: string) => [{ ...boardQueryKeys.all[0], entity: "item", id }] as const,
};

export default boardQueryKeys;
