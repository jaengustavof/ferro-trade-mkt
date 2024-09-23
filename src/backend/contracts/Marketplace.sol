// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//importamos la interfaz del contrato ERC721 - nos va a permitir utilizar los tokens NFT721 que creamos en el otro contrato
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// Seguridadd del marketplace
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
//owner only
import "@openzeppelin/contracts/access/Ownable.sol";

//Heredamos de openzeppelin
contract Marketplace is ReentrancyGuard, Ownable  {

    //Direccin que recibe los fees
    address payable public immutable feeAccount;
    //Porcentaje de tasas a la hora de crear un NFT. Deberíamos cambiarlo por la venta de cada NFT
    uint public immutable feePercent;
    //Cuenta la cantidad de NFTs totales que tenemos en el Marketplace
    uint public itemCount;
    uint public sharesCount;

    //Estructura de datos para cada NFT
    struct Item {
        uint itemId;
        //aqui referenciamos al NFT IERC721 creado en el smartcontract NFT
        IERC721 nft;
        //id del token
        uint tokenId;
        //uint price;
        // pendiente cambiar price por shares
        uint shares;
        // address del que lo vende 
        address payable seller;
        address owner;
        bool available;
        bool sold;
    }

    //creamos un array relacionando cada identificador con el item 
    mapping (uint => Item) public items;
    //mapping de owners
    mapping (uint => address) public owners;

    struct PriceRange {
        uint min; 
        uint max;
        uint price;
    }
    // Array para almacenar los rangos de precio
    PriceRange[] public priceRanges;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint shares,
        //uint price,
        address indexed seller
    );

    event Bought(
        uint itemId,
        //lo indexamos para que podamos buscar el nft mediante esa dirección
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    event Transfered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed seller,
        address indexed buyer
    );

    //_feePercent es el % que se pagará en relación a cada NFT
    constructor(uint _feePercent) {
        //% de la venta
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;

        priceRanges.push(PriceRange(1, 4, 250));
        priceRanges.push(PriceRange(5, 9, 225));
        priceRanges.push(PriceRange(10, 14, 205));
        priceRanges.push(PriceRange(15, 19, 185));
        priceRanges.push(PriceRange(20, 25, 178));
    }

    //el nft es el que minteamos con el contrato NFT.sol y el token ID es el tokenCount t
    // cambiar uint _price por _uint
    function makeItem(IERC721 _nft, uint _tokenId, uint _shares) external onlyOwner nonReentrant {
        require(_shares > 0 && _shares <= 25, "debe ser mayour a 1 y menor que 25");
        sharesCount += _shares;
        itemCount++;
        //transfiere el nft del address del creador (msg.sender) al address del marketplace (address(this))
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        //llamada al mapping de items. el mapping item en la posición itemCount, 
        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            //_price,
            _shares,
            payable(msg.sender), //el msg sender permite recibir pagos
            msg.sender,
            true, //está disponible en el marketplace
            false // está creado, pero todavvía no está vendido
        );
        owners[itemCount] = msg.sender;

        emit Offered(
            itemCount, 
            address(_nft),
            _tokenId,
            _shares,
            msg.sender   
        );
    }

    function getTotalShares(uint _itemId) view public returns(uint) {
        return (items[_itemId].shares);
    }

    function getPriceRangePrice(uint _position) view public returns (uint) {
        return priceRanges[_position].price;
    }

    function getPriceFromShares(uint _shares) view public returns (uint) {
        for (uint i = 0; i < priceRanges.length; i++) {
            if (_shares >= priceRanges[i].min && _shares <= priceRanges[i].max) {
                return (priceRanges[i].price* _shares);
            }
        }
        revert("Cantidad fuera de los rangos definidos");
    }

    function getPriceFromItem(uint _itemId) view public returns (uint) {
        uint _totalShares = getTotalShares(_itemId);
        uint _totalPrice = getPriceFromShares(_totalShares);
        return _totalPrice;
    }

    function setRangePrices (uint newPrice1, uint newPrice2, uint newPrice3, uint newPrice4, uint newPrice5) public onlyOwner  {
        require(priceRanges.length == 5, "El array de rangos de precio debe tener exactamente 5 elementos");
        // Actualizar los valores de precio para cada rango
        priceRanges[0].price = newPrice1;
        priceRanges[1].price = newPrice2;
        priceRanges[2].price = newPrice3;
        priceRanges[3].price = newPrice4;
        priceRanges[4].price = newPrice5;
    }

    function trasnferItem(uint _itemId) external nonReentrant {
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "el nft no existe"); //sino el articulo no existe
        require(!item.sold, "este NFT no esta a la venta"); //sold debe ser false para que se pueda vender
        
        //TOOD: intentar meter esto aqui nft.setApprovalForAll(address(marketplaceContract), true);
        
        // Verifica si el propietario actual del NFT es el contrato Marketplace
        if(item.nft.ownerOf(item.tokenId) != address(this)) {
            // Si el propietario actual no es el contrato, transfiere el NFT al contrato Marketplace
            require(item.nft.ownerOf(item.tokenId) == item.owner, "El propietario registrado no coincide");
            item.nft.transferFrom(item.owner, address(this), item.tokenId);
        }

        // Transferir el NFT del propietario actual al nuevo propietario
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        item.sold = true;
        item.owner = msg.sender;
        owners[_itemId] = msg.sender;
        emit Transfered (
            _itemId, 
            address(item.nft), 
            item.tokenId, 
            item.seller, 
            msg.sender
        );
    }
    //TODO: hacer redeploy del contrato NFT y probar la funcionalidad de transferir un NFT
    function transferItemTo(uint _itemId, address _to) external onlyOwner nonReentrant {
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "Item does not exist");
        require(!item.sold, "Item is already sold");
        require(item.nft.ownerOf(item.tokenId) == address(this), "Marketplace is not the owner");

        item.nft.transferFrom(address(this), _to, item.tokenId);
        item.sold = true;
        item.owner = _to;
        owners[_itemId] = _to;

        emit Transfered (
            _itemId,
            address(item.nft),
            item.tokenId,
            item.seller,
            _to
        );
    }

    function allowSale(uint _itemId) external nonReentrant {
        Item storage item = items[_itemId];
        require(item.owner == msg.sender, "only the owner of the NFT can open to sale");
        
        // Solo actualizar el estado del ítem
        item.sold = false;
    }

    function activateNft(uint _itemId) external onlyOwner nonReentrant {
        Item storage item = items[_itemId];
        item.available = !item.available;
    }

    // EN EL CASO QUE CAMBIEMOS SHARES POR ETHS
    //dado un itemId, podemos obtener el precio del item. Del mapping de items obtenemos la posición del _itemId y accedemos al price.
    //Multiplicamos el price por el feePercent
    /*
    function getTotalPrice(uint _itemId) view public returns(uint) {
        return ((items[_itemId].price*(100 + feePercent))/100);
    }*/
    /*

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        //guardamos en una variable el item en question
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount); //sino el articulo no existe
        require(msg.value >= _totalPrice); // debe pagar lo que sale el item
        require(!item.sold); // el item debe estar disponible
        //el dueño del nft (item.seller) recibe el precio del nft. Hay que buscar un metodo de transferencia sin pago 
        item.seller.transfer(item.price);
        //feeAccount (que esta configurado con el msg.sender) recibe el fee de la transferencia
        feeAccount.transfer(_totalPrice - item.price);
        item.sold = true;
        //esto hace la transferencia del nft del marketplace al comprador
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        emit Bought(
            _itemId, 
            address(item.nft), 
            item.tokenId, 
            item.price, 
            item.seller, 
            msg.sender
        );
    }*/

}