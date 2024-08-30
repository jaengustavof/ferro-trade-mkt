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
                console.log(result);
                setImage(`https://laferro.infura-ipfs.io/ipfs/${result.path}`);
                
            } catch (error) {
                console.log("ipfs image upload error: ", error);
                
            }
            console.log('image uploaded to ipfs: ', image);
        }
    }

    //TODO: Crear NFT - Ya está subiendo la imagen a IPFS
    const createNFT = async () => {

    }

    const onSubmit = (data) => {
        uploadToIPFS(data.imgPath[0]);
        setName(data.name);
        setDescription(data.description);
        setShares(data.shares);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column', gap:'20px'}}>

                <input 
                    type="file" 
                    placeholder="Seleccione una imagen" 
                    {...register("imgPath", { required: true })} 
                />
                {errors.imgPath && <span>Debe elegir una imagen</span>}

                <input 
                    type="text" 
                    placeholder="Nombre del NFT" 
                    {...register("name", { required: true })} 
                />
                {errors.name && <span>Debe ingresar un nombre</span>}

                <textarea 
                    placeholder="Descripción" 
                    {...register("description", { required: true })} 
                />
                {errors.description && <span>Debe ingresar una descripción</span>}

                
                <select {...register("shares", { required: true })}>
                    
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>

                <input type="submit" />
            </form>
        </>
    )
}

export default CreateForm