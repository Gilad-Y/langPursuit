import { OkPacket } from "mysql";
import { UserModel } from "../Models/userModel";
import dal_mysql from "../Utils/dal_mysql";
import { wordsModel } from "../Models/wordsModel";

const getMyWords = async (id: number, lang: string) => {
  const SQLcmd = `
      SELECT *
      FROM wordsTable 
      WHERE userId = ${id} AND lang = '${lang}'
    `;
  const data = await dal_mysql.execute(SQLcmd);
  // console.log(data)
  return data;
};
const uploadWords = async (id: number, words: wordsModel[], lang: string) => {
  words.map(async (word) => {
    const SQLcmd = `
      INSERT INTO wordsTable
       (userId,word, definition, lang, category)
        VALUES (${id},'${word.word}', '${word.definition}', '${lang}', '${word.category}');

    `;
    const data = await dal_mysql.execute(SQLcmd);
  });

  return true;
};
const getLangListById = async (id: number) => {
  const SQLcmd = `
      SELECT lang
      FROM usersTable
      WHERE id = ${id}
    `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const deleteWord = async (id: string[]) => {
  const SQLcmd = `
     DELETE FROM wordsTable
      WHERE id IN (${id.join(",")})
    `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const editWord = async (word: wordsModel) => {
  const SQLcmd = `
    UPDATE wordsTable SET 
    word = '${word.word}', definition = '${word.definition}',category = '${word.category}' 
    WHERE (id = ${word.id});
    `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const getPractice = async (words: wordsModel[]) => {
  return words;
};
export {
  getMyWords,
  uploadWords,
  editWord,
  getLangListById,
  deleteWord,
  getPractice,
};
