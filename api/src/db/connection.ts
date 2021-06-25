import { connect} from "mongoose";
async function connection(): Promise<void> {
  // Connect to MongoDB
  console.log(process.env.CONNECTION_STRING);
  
  await connect(process.env.CONNECTION_STRING, {
    useCreateIndex: true
  });
}

export default connection;