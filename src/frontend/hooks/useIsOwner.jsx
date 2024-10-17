import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useIsOwner = () => {
  const { marketplace, account } = useContext(GlobalContext);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwner = async () => {
      if (!marketplace || !account) return;

      try {
        // Obtener el owner desde el contrato marketplace
        const owner = await marketplace.owner();
        
        // Comparar el owner con la dirección conectada
        if (owner.toLowerCase() === account.toLowerCase()) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        console.error("Error al verificar el owner:", error);
        setIsOwner(false);
      }
    };

    checkOwner();
  }, [marketplace, account]);

  return isOwner;
};

export default useIsOwner;
