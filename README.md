# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# ferro-tradde-mkt

### 1. Install Dependencies:
`$ npm install`
### 2. Arranque de la Blockchain de desarrollo local
`$ npx hardhat node`

### 3. Conectar las cuentas del blockchain de desarrollo a Metamask
- Copiar la clave privada de las direcciones e importarla a Metamask
- Conecta metamask al hardhat blockchain, 127.0.0.1:8545.

### 4. Migrar los Smart Contracts
`npx hardhat run src/backend/scripts/deploy.js --network ganache`

### 5. Ejecutar los Tests
`$ npx hardhat test`

### 6. Lanzar el Frontend
`$ npm run start`
