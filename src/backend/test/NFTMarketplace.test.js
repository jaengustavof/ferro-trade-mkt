const {expect} = require("chai");
const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("NFTMarketplace", function() { 

    let NFT;
    let nft;
    let Marketplace;
    let marketplace;
    let deployer;
    let addr1;
    let addr2;
    let addrs;
    let feePercent = 0;
    let URI = "sample URI";

    beforeEach(async function() {

        NFT = await ethers.getContractFactory("NFT");
        Marketplace = await ethers.getContractFactory("Marketplace");

        [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(feePercent);

    });

    describe("Deployment", function() {

        it("Should track name and symbol from NFT contract", async function() {
            const nftName = "Acciones Ferro NFT";
            const nftSymbol = "AFN";
            expect(await nft.name()).to.equal(nftName);
            expect(await nft.symbol()).to.equal(nftSymbol);
        });

        it("Should track feePercent and feePercent from Marketplace", async function() {
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            expect(await marketplace.feePercent()).to.equal(feePercent);
        });

        it("Should track initial price ranges from Marketplace", async function() {
            const expectedPriceRanges = [
                {min: 1, max: 4, price: 250},
                {min: 5, max: 9, price: 225},
                {min: 10, max: 14, price: 205},
                {min: 15, max: 19, price: 185},
                {min: 20, max: 25, price: 178}
            ];
        
            for (let i = 0; i < expectedPriceRanges.length; i++) {
                const priceRange = await marketplace.priceRanges(i);
                
                expect(priceRange.min.toNumber()).to.equal(expectedPriceRanges[i].min);
                expect(priceRange.max.toNumber()).to.equal(expectedPriceRanges[i].max);
                expect(priceRange.price.toNumber()).to.equal(expectedPriceRanges[i].price);
            }
        });
    });

    describe("Minting NFTs", function() {
        it("Should track each minted nft", async function() {
            await nft.connect(addr1).mint(URI);
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);

            await nft.connect(addr2).mint(URI);
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.balanceOf(addr2.address)).to.equal(1);
            expect(await nft.tokenURI(2)).to.equal(URI);
        });
    });
    
    describe("Making Marketplace Items", function() {
        let shares = 1;
        let result;

        beforeEach(async function() {
            await nft.connect(deployer).mint(URI);
            await nft.connect(deployer).setApprovalForAll(marketplace.address, true);
        });

        it("Should track new marketplace item", async function() {
            await expect(marketplace.connect(deployer).makeItem(nft.address, 1, shares))
                .to.emit(marketplace, "Offered")
                .withArgs(1, nft.address, 1, shares, deployer.address);
            
            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            expect(await marketplace.itemCount()).to.equal(1);
        
            const item = await marketplace.items(1);
            expect(item.itemId).to.equal(1);
            expect(item.nft).to.equal(nft.address);
            expect(item.tokenId).to.equal(1);
            expect(item.shares).to.equal(shares);
            expect(item.seller).to.equal(deployer.address);
            expect(item.owner).to.equal(deployer.address);
            expect(item.available).to.equal(true);
            expect(item.sold).to.equal(false);
        });
        
        it("Should fail if the shares are less than 1", async function() {
            await expect(marketplace.connect(deployer).makeItem(nft.address, 1, 0))
            .to.be.revertedWith("debe ser mayour a 1 y menor que 25");
        });
    });

    describe("Transfer marketplace item", function() {
        let shares = 1;

        beforeEach(async function() {
            await nft.connect(deployer).mint(URI);
            await nft.connect(deployer).setApprovalForAll(marketplace.address, true);
            await marketplace.connect(deployer).makeItem(nft.address, 1, shares);
        });

        it("Should transfer item to another address", async function() {
            await expect(marketplace.connect(addr1).trasnferItem(1))
            .to.emit(marketplace, "Transfered")
            .withArgs(1, nft.address, 1, deployer.address, addr1.address);

            const item = await marketplace.items(1);

            expect(await nft.ownerOf(1)).to.equal(addr1.address);
            expect(await item.owner).to.equal(addr1.address);
            expect(await item.sold).to.equal(true);

        });

        it("Should fail if the item is not available", async function() {
            await marketplace.connect(addr1).trasnferItem(1);
            await expect(marketplace.connect(addr2).trasnferItem(1))
                .to.be.revertedWith("este NFT no esta a la venta");
            const item = await marketplace.items(1);
            expect(await item.sold).to.equal(true);
        });

        it("Should not allow anyone but the NFT owner to change the sold status", async function() {
            await marketplace.connect(addr1).trasnferItem(1);
            await expect(marketplace.connect(addr2).allowSale(1))
                .to.be.revertedWith("only the owner of the NFT can open to sale");
            const item = await marketplace.items(1);
            expect(item.owner).to.equal(addr1.address);
        });

    
        it("Should allow NFT owner to change the sold status and transfer the NFT to another account", async function() {
            await marketplace.connect(addr1).trasnferItem(1);
            await marketplace.connect(addr1).allowSale(1);
            let item = await marketplace.items(1);
            expect(item.sold).to.equal(false);

            /** IMPORTANTE HACER EL SET APPROVAL ANTES DE TRANSFERIR DE UN MIEMBRO A OTRO */
            /** IMPORTANTE HACER EL SET APPROVAL ANTES DE TRANSFERIR DE UN MIEMBRO A OTRO */
            /** IMPORTANTE HACER EL SET APPROVAL ANTES DE TRANSFERIR DE UN MIEMBRO A OTRO */
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
            /** IMPORTANTE HACER EL SET APPROVAL ANTES DE TRANSFERIR DE UN MIEMBRO A OTRO */
            /** IMPORTANTE HACER EL SET APPROVAL ANTES DE TRANSFERIR DE UN MIEMBRO A OTRO */
            /** IMPORTANTE HACER EL SET APPROVAL ANTES DE TRANSFERIR DE UN MIEMBRO A OTRO */
            
            await expect(marketplace.connect(addr2).trasnferItem(1))
            .to.emit(marketplace, "Transfered")
            .withArgs(1, nft.address, 1, deployer.address, addr2.address);
            item = await marketplace.items(1);

        });
    
        /*
        it("Should fail if the item is not available", async function() {
            await marketplace.connect(deployer).buyItem(1, {value: toWei(1)});
            await expect(marketplace.connect(deployer).transferItem(1, addr1.address))
                .to.be.revertedWith("El item no esta disponible");
        });*/
    }); 
});