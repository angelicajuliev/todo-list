import { connect} from "mongoose";
async function connection(): Promise<void> {
  // 4. Connect to MongoDB
  await connect("mongodb://db:27017/todo", {
    useCreateIndex: true
  });
}

export default connection;