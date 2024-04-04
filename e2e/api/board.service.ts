import APIService from "@/api/api.service";

class BoardService extends APIService {
  board!: Board;
  members: Member[] = [];
  tags: Tag[] = [];

  async create(board: { name: string; description: string }) {
    try {
      const res = await this.fetchClient.post("/boards", board);
      this.board = res.data;
    } catch (error) {
      console.error("Erro while trying to create a board", error);
    }
  }

  async delete() {
    if (!this.board || !this.board._id) {
      throw new Error("Board does not exists or does not have an id");
    }
    try {
      await this.fetchClient.delete(`/boards/${this.board._id}`);
    } catch (error) {
      console.error("Error while trying to create a board", error);
    }
  }

  async getBoardMembers() {
    try {
      const { data } = await this.fetchClient.get(`/boards/${this.board._id}/members`);
      // updates members lists
      this.members = data.members;
    } catch (error) {
      console.error("Error while trying geting a board members", error);
    }
  }

  async addMember(userIdentifier: string) {
    let user: User | null = null;
    try {
      const { data } = await this.fetchClient.get(`/users/${userIdentifier}`);
      user = data;
    } catch (error) {
      console.error("Error while trying geting a user", error);
    }

    try {
      await this.fetchClient.post(`/boards/${this.board._id}/members/${user?._id}`);
    } catch (error) {
      console.error("Error while trying to add user to the board", error);
    }

    await this.getBoardMembers();
  }

  async addTag({ name, color }: { name: string; color: string }) {
    try {
      const { data } = await this.fetchClient.post("/tags", {
        boardId: this.board._id,
        key: color,
        name,
      });
      this.tags.push(data);
    } catch (error) {
      console.error("Error while trying to create a tag", error);
    }
  }
}

export default BoardService;
