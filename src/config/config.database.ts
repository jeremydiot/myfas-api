import { QueryInterface, Sequelize } from "sequelize/types";

export class ConfigDatabase{
  public static async up(database: Sequelize){

    const queryInterface: QueryInterface = database.getQueryInterface();
// CONSTRAINTS

    /** sql
     *  CONSTRAINT unique_key_pair UNIQUE(key1,key2)
     */ 
    await queryInterface.addConstraint("users_medias", ["user_id", "media_id"], {
      type: "unique",
      name: "users_medias_unique_pair"
    });
    await queryInterface.addConstraint("actors", ["media_id", "personality_id"], {
      type: "unique",
      name: "actors_unique_pair"

    });
    await queryInterface.addConstraint("directors", ["media_id", "personality_id"], {
      type: "unique",
      name: "directors_unique_pair"

    });
    await queryInterface.addConstraint("producers", ["media_id", "personality_id"], {
      type: "unique",
      name: "producers_unique_pair"
    });
    await queryInterface.addConstraint("medias_genres", ["media_id", "genre_id"], {
      type: "unique",
      name: "medias_genres_unique_pair"
    });
    await queryInterface.addConstraint("medias_sources", ["media_id", "source_id"], {
      type: "unique",
      name: "medias_sources_unique_pair"
    });


// EXTENSIONS
    await database.query("CREATE EXTENSION pgcrypto;");


// FUNCTIONS

    /** sql
     * 
     * -- hash password in database
     * CREATE OR REPLACE FUNCTION hash_password_func() RETURNS trigger AS $$
     * BEGIN
     *    NEW.password = crypt(NEW.password, gen_salt('bf', 10));
     *    RETURN NEW;
     * END;
     * $$ LANGUAGE plpgsql;
     */

    await queryInterface.createFunction(
      "hash_password_func",
      [],
      "trigger",
      "plpgsql",
      "NEW.password = crypt(NEW.password, gen_salt('bf', 10)); RETURN NEW;",
      []
    );

    /** sql
     * 
     * -- check password in database
     * CREATE OR REPLACE FUNCTION check_password(integer,text) RETURNS BOOLEAN AS $$
     *     DECLARE checkPswd BOOLEAN;
     *     BEGIN
     *         SELECT (password = crypt($2,password)) INTO checkPswd 
     *         FROM users WHERE id = $1;
     *
     *         RETURN checkPswd;
     *   END;
     * $$ LANGUAGE plpgsql;
     */
    await queryInterface.createFunction(
      "check_password",
      [{ type: "integer" }, { type: "text" }],
      "BOOLEAN",
      "plpgsql",
      "SELECT (password = crypt($2,password)) INTO checkPswd FROM users WHERE id = $1; RETURN checkPswd;",
      [],
      {
        //@ts-ignore
        variables:
          [
            { type: "BOOLEAN", name: "checkPswd" }
          ]
      }
    );

// TRIGGER

    /** sql
     * -- event on insert or update password
     * CREATE TRIGGER update_or_insert_pswd_tg BEFORE INSERT OR UPDATE OF password ON users
     * FOR EACH ROW 
     * EXECUTE FUNCTION hash_password_func();
     */

    await database.query("CREATE TRIGGER update_or_insert_pswd_tg BEFORE INSERT OR UPDATE OF password ON users FOR EACH ROW EXECUTE FUNCTION hash_password_func();");
  }

  public static async down(database: Sequelize){
    const queryInterface: QueryInterface = database.getQueryInterface();

    await queryInterface.removeConstraint("users_medias","users_medias_unique_pair");
    await queryInterface.removeConstraint("actors","actors_unique_pair");
    await queryInterface.removeConstraint("directors","directors_unique_pair");
    await queryInterface.removeConstraint("producers","producers_unique_pair");
    await queryInterface.removeConstraint("medias_genres","medias_genres_unique_pair");
    await queryInterface.removeConstraint("medias_sources","medias_sources_unique_pair");
  
    await database.query("DROP EXTENSION pgcrypto;");
  
    await queryInterface.dropFunction("hash_password_func",[]);
    await queryInterface.dropFunction("check_password",[{type:"integer"},{type:"text"}]);
  
    await database.query("DROP TRIGGER update_or_insert_pswd_tg ON users");
  }
}
