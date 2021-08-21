const getUserFromJWT = require("../../helper/getUserFromJWT");
const TaskRepository = require("../../repositories/TaskRepository");
const BoardRepository = require("../../repositories/BoardRepository");
const NotificationRepository = require("../../repositories/NotificationRepository");
const TaskService = require("../../services/TaskService");

const taskService = TaskService({ TaskRepository, BoardRepository, NotificationRepository });

module.exports = (io, socket) => {
  return {
    moveTask: async (data) => {
      try {
        const { payload, roomId, token } = data;
        const { source, destination } = payload;

         const { verified } = await getUserFromJWT(token);
        if (!verified) {
          // !RAISE UNAUTHORIZED ERROR
        }
        await taskService.moveTask(roomId, source, destination);
        const response = { message: "moved task", source, destination };
        socket.to(roomId).emit("moveTask", response);
        // call({ error });
      } catch (error) {
        console.log(error);
        
        // call({ error });
      }
    },
    deleteTask: async (data, call) => {
      const { payload, roomId, token } = data;
      const { taskId } = payload;
      try {
        const { verified } = await getUserFromJWT(token);

        if (!verified) {
          // !RAISE UNAUTHORIZED ERROR
        }
        const { taskIndex, columnIndex } = await taskService.deleteTask(roomId, taskId);
        const response = { message: "deleted task", taskIndex, columnIndex };
        io.in(roomId).emit("deleteTask", response);
        call(response);
      } catch (error) {
        call({ error });
      }
    },
    createTask: async (data, call) => {
      try {
        const { payload, roomId, token } = data;
        const { columnId, title, description, tags, people } = payload;
        const { id: authorId, verified } = await getUserFromJWT(token);

        if (!verified) {
          // !RAISE UNAUTHORIZED ERROR
        }
        const taskData = {
          title,
          description,
          tags,
          people,
          author: authorId,
          board: roomId,
        };
        const { task, columnIndex } = await taskService.createBoardTask(roomId, columnId, taskData);
        const response = { message: "created task", task, columnIndex };
        io.in(roomId).emit("createTask", { ...response });
        call(response);
      } catch (error) {
        call({ error: error });
      }
      // try {
      //   const { columnId, boardId, title, description, tags, people, authorId } = data;
      //   // const newTask = await taskService.createTask(boardId);

      //   const foundBoard = await Board.findOne({ _id: boardId }, "_id name columns");
      //   const newTask = new Task({
      //     title,
      //     description,
      //     tags,
      //     people,
      //     author: authorId,
      //     board: boardId,
      //   });
      //   const savedTask = await newTask.save();
      //   const columnIndex = foundBoard.columns.findIndex(({ _id }) => {
      //     return _id.toLocaleString() === columnId.toLocaleString();
      //   });
      //   foundBoard.columns[columnIndex].tasks.push(savedTask._id);
      //   const task = await savedTask
      //     .populate("people tags author", "username avatarImageURL name color")
      //     .execPopulate();
      //   await foundBoard.save();

      //   const newNotification = {
      //     title: foundBoard.name,
      //     info: `assigned new task: ${title}`,
      //     url: `/board/${foundBoard._id}?task=${task._id}`,
      //   };
      //   await User.updateMany(
      //     { _id: { $in: people } },
      //     { $push: { notifications: newNotification } }
      //   );
      //   return {
      //     success: true,
      //     message: "created task",
      //     task: { columnIndex, ...task.toObject() },
      //   };
      // } catch (error) {
      //   next(error);
      // }
    },
  };
};
