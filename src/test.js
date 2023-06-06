import { enCryptPassword } from "./modules/authentication/authentication.methods.js";

async function test() {
  const pass = await enCryptPassword("tieptan");
  console.log(pass);
}
test();
