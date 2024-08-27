// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; //Almacena la URL de la imagen del token NFT

contract NFT is ERC721URIStorage {
    //permite contar cuantos tokens se han emitido
    uint public tokenCount; 

    //nombre y simbolo del nft
    constructor () ERC721("Acciones Ferro NFT", "AFN"){}

    // function mint para crear nuevos NFTs. 
    // pasamos la dirección de la imagen del token. 
    // Devuelve un uint de la cantidad de tokens creada
    function mint(string memory _tokenURI) external returns (uint) { 
        //incrementamos una unidad al contador
        tokenCount++; 
        
        //crea el token. Se pasa el parametro de quien lo crea y el token count que funciona como ID del token
        _safeMint(msg.sender, tokenCount);

        //Setamos el ID y el URI de la imagen
        _setTokenURI(tokenCount, _tokenURI);

        //Devuelve el numero de tokens
        return tokenCount;
    }
}