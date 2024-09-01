import { useForm } from "react-hook-form"
import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client';

const projectId = '06b3fb98b08f420e836654cb904692b5';
const projectSecret = 'D+eRfWMNPvaKfoLjKaA6ql3O0+2VTdDFAfGhciAZKWzc4+TuVTSnog';
const credentials = projectId + ':' + projectSecret;
const encodedCredentials = btoa(credentials);
const authHeader = 'Basic ' + encodedCredentials;
const client = ipfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    authorization: authHeader}}); //nodo infura para conectar cliente IPFS

const CreateForm = ({marketplace, nft}) => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shares, setShares] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const uploadToIPFS = async (image) =>{
        console.log(image)
        if(typeof image !== 'undefined') {
            console.log("uploading image to ipfs");
            try {
                const result = await client.add(image);
                const resultUrl = `https://laferro.infura-ipfs.io/ipfs/${result.path}`;
                setImage(resultUrl);
                return resultUrl;
                
            } catch (error) {
                console.log("ipfs image upload error: ", error);
                
            }
            console.log('image uploaded to ipfs: ', image);
        }
    }

    //TODO: Crear NFT - Ya está subiendo la imagen a IPFS
    const createNFT = async (imageToUpload, dataName, dataDescription, dataShares) => {
     
        if(!imageToUpload || !dataName || !dataDescription || !dataShares) return;

        try {
            const result = await client.add(JSON.stringify({ imageToUpload, dataShares, dataName, dataDescription }));
            console.log('this is the result', result);
            mintThenList(result, dataShares);
            console.log("NFT created and listed successfully");
        } catch (error) {
            console.log("ipfs URI upload error: ", error);
        }
    }

    const mintThenList = async (result, dataShares) =>{
        console.log('resunt in teh mintThenList', result);
        const uri = `https://laferro.infura-ipfs.io/ipfs/${result.path}`;
        console.log(uri);
        await (await nft.mint(uri)).wait();

        const id = await nft.tokenCount();
        await (await nft.setApprovalForAll(marketplace.address, true));

        const sharesAmount = dataShares; 
        console.log('Shares amount:', sharesAmount);
        await (await marketplace.makeItem(nft.address, id, sharesAmount)).wait();
    }

    const onSubmit = async (data) => {
        
        const imageToUpload = await uploadToIPFS(data.imgPath[0]);
        // Ahora llamamos a createNFT pasando los valores directos
        setName(data.name);
        setDescription(data.description);
        setShares(data.shares);
        setTimeout(() => {
            createNFT(imageToUpload, data.name, data.description, data.shares);
        }, 2000);
        
    }

    return (
        <div className="create-section__form-container">
            <h1 class="form-heading">Crear NFT</h1>
            <p class="form-text">Completa los datos para crear un <span class="">nuevo NFT</span></p>
            <form onSubmit={handleSubmit(onSubmit)} className="create-form">
                <div className="form-group">
                    <label htmlFor="imgPath">Seleccione una imagen</label>
                    <input 
                    type="file" 
                    id="imgPath" 
                    placeholder="Seleccione una imagen" 
                    {...register("imgPath", { required: true })} 
                    />
                    {errors.imgPath && <span className="error-message">Debe elegir una imagen</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Nombre del NFT</label>
                    <input 
                    type="text" 
                    id="name" 
                    placeholder="Nombre del NFT" 
                    {...register("name", { required: true })} 
                    />
                    {errors.name && <span className="error-message">Debe ingresar un nombre</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <textarea 
                    id="description" 
                    placeholder="Descripción" 
                    {...register("description", { required: true })} 
                    />
                    {errors.description && <span className="error-message">Debe ingresar una descripción</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="shares">Cantidad de acciones</label>
                    <select id="shares" {...register("shares", { required: true })}>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    </select>
                </div>

                <input type="submit" value="Crear NFT" className="submit-button" />
                </form>
        </div>
    )
}

export default CreateForm