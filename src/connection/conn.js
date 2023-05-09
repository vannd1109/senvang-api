const mssql = require("mssql");

class DBConnectionProduction {
  async getConnection() {
    try {
      return await mssql.connect({
        user: "sa",
        password: "Binh@n1452",
        server: "172.17.90.7",
        database: "Production",
        port: 1433,
        options: {
          encrypt: false,
          trustServerCertificate: true,
          trustedConnection: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

class DBConnectionWiseEyeOn {
  async getConnection() {
    try {
      return await mssql.connect({
        user: "sa",
        password: "Binh@n1452",
        server: "172.17.90.7",
        database: "WiseEyeOn",
        port: 1433,
        options: {
          encrypt: false,
          trustServerCertificate: true,
          trustedConnection: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

class DBConnectionEpad180 {
  async getConnection() {
    try {
      return await mssql.connect({
        user: "sa",
        password: "Binh@n1452",
        server: "172.17.90.7",
        database: "epad_180",
        port: 1433,
        options: {
          encrypt: false,
          trustServerCertificate: true,
          trustedConnection: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  DBConnectionProduction,
  DBConnectionWiseEyeOn,
  DBConnectionEpad180
}
