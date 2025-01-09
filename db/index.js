const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rwdsilva802:Vehwes123@cluster0.hcp4c.mongodb.net/meuBancoDeDados?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB Atlas!");
    // Sua lógica adicional...
  } catch (err) {
    console.error("Erro na conexão:", err);
  } finally {
    await client.close();
  }
}

run();
