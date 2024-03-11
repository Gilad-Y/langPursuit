import { OkPacket } from "mysql";
import { UserModel } from "../Models/userModel";
import dal_mysql from "../Utils/dal_mysql";

const getMyWords = async (id: number) => {
  const SQLcmd = `
      SELECT *
      FROM wordsTable 
      WHERE id = ${id}
    `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

export { getMyWords };
